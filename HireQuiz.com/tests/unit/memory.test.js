const memory = require('../../src/model/data/memory/index.js');
const MemoryDB = require('../../src/model/data/memory/memory-db');

describe('checking index.js file of memory-db', () => {
  let db;
  beforeEach(() => {
    db = new MemoryDB();
  });

  test('checking readPosting function', async () => {
    const data = { value: 123 };
    await db.put('a', 'b', data);
    const posting = await memory.readPosting('a', 'b');
    expect(posting).tobetrue;
  });

  test('checking writePosting function', async () => {
    const data = { ownerId: 'a', id: 'b', value: 123 };
    const posting = await memory.writePosting(data);
    expect(posting).tobetrue;
  });

  test('checking readPostingData function', async () => {
    const data = { value: 123 };
    await db.put('a', 'b', data);
    const posting = await memory.readPostingData('a', 'b');
    expect(posting).tobetrue;
  });

  test('checking writePostingData function', async () => {
    const data = { value: 123 };
    const posting = await memory.writePostingData('a', 'b', data);
    expect(posting).tobetrue;
  });
});
