class kvdb {

  constructor(schema = '_') {

    // UUID generator
    this._uuid = function() {
      var dt = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt/16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    };

    this.db = localStorage;
    this.schema = schema;
    this.is_new = false;
    let k = this.schema + '._id';
    let _id = this.db.getItem(k);
    if (_id === null) {
      _id = this._uuid();
      this.db.setItem(k, _id);
      this.is_new = true;
    };

  }

  _isJ(s) {
    try {
      JSON.parse(s);
    } catch (e) {
      return false;
    }
    return true;
  }

  _iterateKeys() {
    var keys = [];
    var j, len = this.schema.length;
    for (j = 0; j < this.db.length; j++){
      if (this.db.key(j).substring(0, len) == this.schema) {
        keys[j] = this.db.key(j);
      }
    }
    return(keys);
  }

  isNew() {
    return this.is_new;
  }

  inc(key) {
    key = this.schema + "." + key;
    let v = this.db.getItem(key);
    if (v === null) {
      this.db.setItem(key, 1);
    } else {
      this.db.setItem(key, Number(v) + 1);
    }
  }

  get(key, dflt = null) {
    key = this.schema + "." + key;
    if ((this.db.hasOwnProperty(key) == false)) {
      return dflt;
    }

    let value = this.db.getItem(key);
    if (typeof value == 'number') {
      return Number(value);
    }

    else if (this._isJ(value) === true) {
      return JSON.parse(value);
    }
    return value;
  }

  set(key, value) {
    key = this.schema + "." + key;
    if (typeof value == 'number') {
      this.db.setItem(key, value.toString());
    }
    else if (typeof value === 'object' && value !== null) {
      this.db.setItem(key, JSON.stringify(value));
    }
    else if (Array.isArray(value) === true) {
      this.db.setItem(key, value.toString());
    }
    else {
      this.db.setItem(key, value);
    }
  }

  del(key) {
    key = this.schema + "." + key;
    this.db.removeItem(key);
  }

  key(index) {
    key = this.schema + "." + key;
    return this.db.key(index);
  }

  keys() {
    let len = this.schema.length;
    let kk = this._iterateKeys();
    let keys = [];
    let j;
    for (j = 1; j < kk.length; j++) {
      keys[j - 1] = kk[j].substring(len + 1);
    }
    return(keys);
  }

  export() {
    var keys = [];
    var k;
    var j, len = this.schema.length;
    let obj = {
      schema: this.schema,
      id: this.db.getItem(this.schema + '._id'),
      data: [],
      version: 1
    };
    for (j = 1; j < this.db.length; j++){
      if (this.db.key(j).substring(0, len) == this.schema) {
        keys[j] = this.db.key(j);
        k = keys[j].substring(len + 1);
        obj.data[j - 1] = { k: k, v: this.get(k) };
      }
    }
    return(JSON.stringify(obj));
  }

  drop() {
    let keys = this._iterateKeys();
    for (let j = 0; j < keys.length; j++) {
      this.db.removeItem(keys[j]);
    }
    this.db.removeItem(this.schema + '._id');
  }

  id() {
    let k = this.schema + '._id';
    return this.db.getItem(k);
  }

}
