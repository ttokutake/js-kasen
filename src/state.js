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

class Next extends Some {
  static isMine(v) {
    return v instanceof Next;
  }
}

class Gone extends None {
  static isMine(v) {
    return v instanceof Gone;
  }
}

class Done {
  constructor(value) {
    this.value = value;
  }

  static isMine(v) {
    return v instanceof Done;
  }
}

module.exports = {
  Some,
  None,
  Next,
  Gone,
  Done
};
