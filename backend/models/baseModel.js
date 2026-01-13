// In-memory storage for demo purposes
// Replace with actual database implementation
let storage = {};
let nextId = 1;

class BaseModel {
  constructor(collectionName) {
    this.collectionName = collectionName;
    if (!storage[collectionName]) {
      storage[collectionName] = [];
    }
  }

  async findAll() {
    return storage[this.collectionName];
  }

  async findById(id) {
    const item = storage[this.collectionName].find(item => item.id === parseInt(id));
    return item || null;
  }

  async create(data) {
    const newItem = {
      id: nextId++,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    storage[this.collectionName].push(newItem);
    return newItem;
  }

  async update(id, data) {
    const index = storage[this.collectionName].findIndex(item => item.id === parseInt(id));
    if (index === -1) return null;

    storage[this.collectionName][index] = {
      ...storage[this.collectionName][index],
      ...data,
      updatedAt: new Date()
    };
    return storage[this.collectionName][index];
  }

  async delete(id) {
    const index = storage[this.collectionName].findIndex(item => item.id === parseInt(id));
    if (index === -1) return false;

    storage[this.collectionName].splice(index, 1);
    return true;
  }

  // Additional utility methods
  async findOne(query) {
    return storage[this.collectionName].find(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    }) || null;
  }

  async count() {
    return storage[this.collectionName].length;
  }
}

module.exports = BaseModel;