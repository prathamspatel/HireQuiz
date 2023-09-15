const MemoryDB = require('./memory-db');

const data = new MemoryDB();
const metadata = new MemoryDB();

// Write metadata to memory db. Returns a Promise
function writePosting(posting) {
  return metadata.put(posting.ownerId, posting.id, posting);
}

// Read a metadata from memory db. Returns a Promise
function readPosting(ownerId, id) {
  return metadata.get(ownerId, id);
}

// Write a data buffer to memory db. Returns a Promise
function writePostingData(ownerId, id, buffer) {
  return data.put(ownerId, id, buffer);
}

// Read a data from memory db. Returns a Promise
function readPostingData(ownerId, id) {
  return data.get(ownerId, id);
}

// Get a list of postings ids/objects for the given user from memory db. Returns a Promise
async function listPostings(ownerId, expand = false) {
  const posting = await metadata.query(ownerId);

  if (expand || !posting) {
    return posting;
  }

  return posting.map((posting) => posting.id);
}

module.exports.listPostings = listPostings;
module.exports.writePosting = writePosting;
module.exports.readPosting = readPosting;
module.exports.writePostingData = writePostingData;
module.exports.readPostingData = readPostingData;
