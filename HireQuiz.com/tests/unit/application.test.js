const { JobApplication } = require('../../src/model/jobApplication');

const wait = async (ms = 10) => new Promise((resolve) => setTimeout(resolve, ms));

const validTypes = [`application/json`];

describe('JobApplication class', () => {
  describe('JobApplication()', () => {
    test('ownerId and type are required', () => {
      expect(() => new JobApplication({})).toThrow();
    });

    test('ownerId is required', () => {
      expect(() => new JobApplication({ type: 'text/plain', size: 1 })).toThrow();
    });

    test('type is required', () => {
      expect(() => new JobApplication({ ownerId: '1234', size: 1 })).toThrow();
    });

    test('size gets set to 0 if missing', () => {
      const application = new JobApplication({ ownerId: '1234', type: 'application/json' });
      expect(application.size).toBe(0);
    });

    test('size must be a number', () => {
      expect(
        () => new JobApplication({ ownerId: '1234', type: 'application/json', size: '1' })
      ).toThrow();
    });

    test('size can be 0', () => {
      expect(
        () => new JobApplication({ ownerId: '1234', type: 'application/json', size: 0 })
      ).not.toThrow();
    });

    test('size cannot be negative', () => {
      expect(
        () => new JobApplication({ ownerId: '1234', type: 'application/json', size: -1 })
      ).toThrow();
    });

    test('invalid types throw', () => {
      expect(
        () => new JobApplication({ ownerId: '1234', type: 'application/msword', size: 1 })
      ).toThrow();
    });

    test('valid types can be set', () => {
      validTypes.forEach((format) => {
        const application = new JobApplication({ ownerId: '1234', type: format, size: 1 });
        expect(application.type).toEqual(format);
      });
    });

    test('applications have an id', () => {
      const application = new JobApplication({
        ownerId: '1234',
        type: 'application/json',
        size: 1,
      });
      expect(application.id).toMatch(
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
      );
    });

    test('applications use id passed in if present', () => {
      const application = new JobApplication({
        id: 'id',
        ownerId: '1234',
        type: 'application/json',
        size: 1,
      });
      expect(application.id).toEqual('id');
    });

    test('applications get a created datetime string', () => {
      const application = new JobApplication({
        ownerId: '1234',
        type: 'application/json',
        size: 1,
      });
      expect(Date.parse(application.created)).not.toBeNaN();
    });

    test('applications get an updated datetime string', () => {
      const application = new JobApplication({
        ownerId: '1234',
        type: 'application/json',
        size: 1,
      });
      expect(Date.parse(application.updated)).not.toBeNaN();
    });
  });

  describe('formats', () => {
    test('formats returns the expected result for plain text', () => {
      const application = new JobApplication({
        ownerId: '1234',
        type: 'application/json',
        size: 0,
      });
      expect(application.formats).toEqual(['application/json']);
    });
  });

  describe('save(), getData(), setData(), byId(), byUser(), delete()', () => {
    test('byUser() returns an empty array if there are no applications for this user', async () => {
      expect(await JobApplication.byUser('1234')).toEqual([]);
    });

    test('a application can be created and save() stores a application for the user', async () => {
      const data = Buffer.from('{hello}');
      const application = new JobApplication({
        ownerId: '1234',
        type: 'application/json',
        size: 0,
      });
      await application.save();
      await application.setData(data);

      const application2 = await JobApplication.byId('1234', application.id);
      expect(application2).toEqual(application);
      expect(await application2.getData()).toEqual(data);
    });

    test('save() updates the updated date/time of a application', async () => {
      const ownerId = '7777';
      const application = new JobApplication({ ownerId, type: 'application/json', size: 0 });
      const modified1 = application.updated;
      await wait();
      await application.save();
      const application2 = await JobApplication.byId(ownerId, application.id);
      expect(Date.parse(application2.updated)).toBeGreaterThan(Date.parse(modified1));
    });

    test('setData() updates the updated date/time of a application', async () => {
      const data = Buffer.from('{hello}');
      const ownerId = '7777';
      const application = new JobApplication({ ownerId, type: 'application/json', size: 0 });
      await application.save();
      const modified1 = application.updated;
      await wait();
      await application.setData(data);
      await wait();
      const application2 = await JobApplication.byId(ownerId, application.id);
      expect(Date.parse(application2.updated)).toBeGreaterThan(Date.parse(modified1));
    });

    test("a application is added to the list of a user's applications", async () => {
      const data = Buffer.from('{hello}');
      const ownerId = '5555';
      const application = new JobApplication({ ownerId, type: 'application/json', size: 0 });
      await application.save();
      await application.setData(data);

      expect(await JobApplication.byUser(ownerId)).toEqual([application.id]);
    });

    test('full applications are returned when requested for a user', async () => {
      const data = Buffer.from('{hello}');
      const ownerId = '6666';
      const application = new JobApplication({ ownerId, type: 'application/json', size: 0 });
      await application.save();
      await application.setData(data);

      expect(await JobApplication.byUser(ownerId, true)).toEqual([application]);
    });

    test('setData() throws if not give a Buffer', () => {
      const application = new JobApplication({ ownerId: '123', type: 'application/json', size: 0 });
      expect(() => application.setData()).rejects.toThrow();
    });

    test('setData() updates the application size', async () => {
      const application = new JobApplication({
        ownerId: '1234',
        type: 'application/json',
        size: 0,
      });
      await application.save();
      await application.setData(Buffer.from('a'));
      expect(application.size).toBe(1);

      await application.setData(Buffer.from('aa'));
      const { size } = await JobApplication.byId('1234', application.id);
      expect(size).toBe(2);
    });
  });
});
