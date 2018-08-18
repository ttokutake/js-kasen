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

module.exports = {
  Some,
  None,
};
