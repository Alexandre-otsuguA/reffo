// @ts-nocheck
import idb from './idb.package';

class IDB {
  private handler;

  constructor({ name, tables }) {
    this.name = name;
    this.tables = tables;
    this.handler = this.open();
  }

  private open() {
    return idb.open(this.name, 1, db => {
      for (const table of this.tables)
        !db.objectStoreNames.contains(table.name) &&
          db.createObjectStore(table.name, {
            keyPath: table.pkey,
            autoIncrement: table.autoIncrement ?? false,
          });
    });
  }

  writeData({ table, content }) {
    return this.handler.then(db => {
      const tx = db.transaction(table, 'readwrite');
      const store = tx.objectStore(table);
      const pkey = store.put(content);
      return { pkey };
    });
  }

  getData({ table, pkey }) {
    return this.handler.then(db => {
      const tx = db.transaction(table, 'readonly');
      const store = tx.objectStore(table);

      return store.get(pkey);
    });
  }

  getAllData({ table }) {
    return this.handler.then(db => {
      const tx = db.transaction(table, 'readonly');
      const store = tx.objectStore(table);

      return store.getAll();
    });
  }

  removeAllData({ table }) {
    return this.handler.then(db => {
      const tx = db.transaction(table, 'readwrite');
      const store = tx.objectStore(table);
      store.clear();
      return tx.complete;
    });
  }

  removeData({ table, pkey }) {
    return this.handler.then(db => {
      const tx = db.transaction(table, 'readwrite');
      const store = tx.objectStore(table);
      store.delete(pkey);
      return tx.complete;
    });
  }
}

const db = new IDB({
  name: 'db',
  tables: [
    { name: 'customer', pkey: 'id' },
    { name: 'wishlist', pkey: 'slug' },
  ],
});

export default db;
