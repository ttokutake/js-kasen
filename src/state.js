export class Some {
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

export class None {
  static isMine(v) {
    return v instanceof None;
  }
}

export class Next extends Some {
  static isMine(v) {
    return v instanceof Next;
  }
}

export class Gone extends None {
  static isMine(v) {
    return v instanceof Gone;
  }
}

export class Done {
  constructor(value) {
    this.value = value;
  }

  static isMine(v) {
    return v instanceof Done;
  }
}
