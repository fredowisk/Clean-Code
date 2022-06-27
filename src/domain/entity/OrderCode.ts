class OrderCode {
  readonly value: string;
  constructor(readonly date: Date, readonly sequence: number) {
    this.value = this.#generateCode();
  }

  #generateCode() {
    return `${this.date.getFullYear()}${this.sequence
      .toString()
      .padStart(8, "0")}`;
  }
}

export default OrderCode;
