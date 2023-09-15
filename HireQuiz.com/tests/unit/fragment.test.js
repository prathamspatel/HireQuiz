const { JobPosting } = require('../../src/model/posting');

const wait = async (ms = 10) => new Promise((resolve) => setTimeout(resolve, ms));

const validTypes = [`application/json`];

describe('JobPosting class', () => {
  describe('JobPosting()', () => {
    test('ownerId and type are required', () => {
      expect(() => new JobPosting({})).toThrow();
    });

    test('ownerId is required', () => {
      expect(() => new JobPosting({ type: 'text/plain', size: 1 })).toThrow();
    });

    test('type is required', () => {
      expect(() => new JobPosting({ ownerId: '1234', size: 1 })).toThrow();
    });

    test('size gets set to 0 if missing', () => {
      const posting = new JobPosting({ ownerId: '1234', type: 'application/json' });
      expect(posting.size).toBe(0);
    });

    test('size must be a number', () => {
      expect(
        () => new JobPosting({ ownerId: '1234', type: 'application/json', size: '1' })
      ).toThrow();
    });

    test('size can be 0', () => {
      expect(
        () => new JobPosting({ ownerId: '1234', type: 'application/json', size: 0 })
      ).not.toThrow();
    });

    test('size cannot be negative', () => {
      expect(
        () => new JobPosting({ ownerId: '1234', type: 'application/json', size: -1 })
      ).toThrow();
    });

    test('invalid types throw', () => {
      expect(
        () => new JobPosting({ ownerId: '1234', type: 'application/msword', size: 1 })
      ).toThrow();
    });

    test('valid types can be set', () => {
      validTypes.forEach((format) => {
        const posting = new JobPosting({ ownerId: '1234', type: format, size: 1 });
        expect(posting.type).toEqual(format);
      });
    });

    test('postings have an id', () => {
      const posting = new JobPosting({ ownerId: '1234', type: 'application/json', size: 1 });
      expect(posting.id).toMatch(
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
      );
    });

    test('postings use id passed in if present', () => {
      const posting = new JobPosting({
        id: 'id',
        ownerId: '1234',
        type: 'application/json',
        size: 1,
      });
      expect(posting.id).toEqual('id');
    });

    test('postings get a created datetime string', () => {
      const posting = new JobPosting({
        ownerId: '1234',
        type: 'application/json',
        size: 1,
      });
      expect(Date.parse(posting.created)).not.toBeNaN();
    });

    test('postings get an updated datetime string', () => {
      const posting = new JobPosting({
        ownerId: '1234',
        type: 'application/json',
        size: 1,
      });
      expect(Date.parse(posting.updated)).not.toBeNaN();
    });
  });

  describe('formats', () => {
    test('formats returns the expected result for plain text', () => {
      const posting = new JobPosting({
        ownerId: '1234',
        type: 'application/json',
        size: 0,
      });
      expect(posting.formats).toEqual(['application/json']);
    });
  });

  describe('save(), getData(), setData(), byId(), byUser(), delete()', () => {
    test('byUser() returns an empty array if there are no postings for this user', async () => {
      expect(await JobPosting.byUser('1234')).toEqual([]);
    });

    test('a posting can be created and save() stores a posting for the user', async () => {
      const data = Buffer.from('{hello}');
      const posting = new JobPosting({ ownerId: '1234', type: 'application/json', size: 0 });
      await posting.save();
      await posting.setData(data);

      const posting2 = await JobPosting.byId('1234', posting.id);
      expect(posting2).toEqual(posting);
      expect(await posting2.getData()).toEqual(data);
    });

    test('save() updates the updated date/time of a posting', async () => {
      const ownerId = '7777';
      const posting = new JobPosting({ ownerId, type: 'application/json', size: 0 });
      const modified1 = posting.updated;
      await wait();
      await posting.save();
      const posting2 = await JobPosting.byId(ownerId, posting.id);
      expect(Date.parse(posting2.updated)).toBeGreaterThan(Date.parse(modified1));
    });

    test('setData() updates the updated date/time of a posting', async () => {
      const data = Buffer.from('{hello}');
      const ownerId = '7777';
      const posting = new JobPosting({ ownerId, type: 'application/json', size: 0 });
      await posting.save();
      const modified1 = posting.updated;
      await wait();
      await posting.setData(data);
      await wait();
      const posting2 = await JobPosting.byId(ownerId, posting.id);
      expect(Date.parse(posting2.updated)).toBeGreaterThan(Date.parse(modified1));
    });

    test("a posting is added to the list of a user's postings", async () => {
      const data = Buffer.from('{hello}');
      const ownerId = '5555';
      const posting = new JobPosting({ ownerId, type: 'application/json', size: 0 });
      await posting.save();
      await posting.setData(data);

      expect(await JobPosting.byUser(ownerId)).toEqual([posting.id]);
    });

    test('full postings are returned when requested for a user', async () => {
      const data = Buffer.from('{hello}');
      const ownerId = '6666';
      const posting = new JobPosting({ ownerId, type: 'application/json', size: 0 });
      await posting.save();
      await posting.setData(data);

      expect(await JobPosting.byUser(ownerId, true)).toEqual([posting]);
    });

    test('setData() throws if not give a Buffer', () => {
      const posting = new JobPosting({ ownerId: '123', type: 'application/json', size: 0 });
      expect(() => posting.setData()).rejects.toThrow();
    });

    test('setData() updates the posting size', async () => {
      const posting = new JobPosting({ ownerId: '1234', type: 'application/json', size: 0 });
      await posting.save();
      await posting.setData(Buffer.from('a'));
      expect(posting.size).toBe(1);

      await posting.setData(Buffer.from('aa'));
      const { size } = await JobPosting.byId('1234', posting.id);
      expect(size).toBe(2);
    });
  });
});
