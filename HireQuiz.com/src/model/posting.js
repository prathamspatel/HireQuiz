const { randomUUID } = require('crypto');
const {
  readPosting,
  writePosting,
  readPostingData,
  writePostingData,
  listPostings,
} = require('./data');

class JobPosting {
  constructor({ id, ownerId, created = new Date(), updated = new Date(), type, size = 0 }) {
    if (!ownerId || !type) {
      throw new Error(`ownerId and type are required`);
    }
    if (size < 0 || typeof size != 'number') {
      throw new Error(`size should be a number and cannot be negative`);
    }
    if (type != 'application/json') {
      throw new Error(`this type is not supported`);
    }
    this.id = id || randomUUID();
    this.ownerId = ownerId;
    this.created = created || created.toISOString();
    this.updated = updated || updated.toISOString();
    this.type = type;
    this.size = size;
  }

  static async byUser(ownerId, expand = false) {
    return await listPostings(ownerId, expand);
  }

  static async byId(ownerId, id) {
    const posting = await readPosting(ownerId, id);
    if (!posting) {
      throw new Error(`${id} not found`);
    }
    return new JobPosting(posting);
  }

  save() {
    this.updated = new Date().toISOString();
    return writePosting(this);
  }

  getData() {
    return readPostingData(this.ownerId, this.id);
  }

  async setData(data) {
    if (!Buffer.isBuffer(data)) {
      throw new Error(`data is not a buffer`);
    }
    this.size = Buffer.byteLength(data);
    await this.save();
    return await writePostingData(this.ownerId, this.id, data);
  }

  get formats() {
    return ['application/json'];
  }
}
module.exports.JobPosting = JobPosting;
