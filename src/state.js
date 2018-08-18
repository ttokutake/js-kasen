class Some {
  constructor(value) {
    this.value = value;
  }

  set(value) {
    this.value = value;
    return this;
  }

  static isMine(v) {
    return v instanceof Some;
  }
}

class None {
  static isMine(v) {
    return v instanceof None;
  }
}

class Break {
  constructor(value) {
    this.value = value;
  }

  static isMine(v) {
    return v instanceof Break;
  }
}

module.exports = {
  Some,
  None,
  Break,
};
