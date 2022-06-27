class Item {
  #CENTIMETERS: number = 100;
  #volume: number = 0;

  constructor(
    readonly idItem: number,
    readonly category: string,
    readonly description: string,
    readonly price: number,
    readonly width: number = 0,
    readonly height: number = 0,
    readonly length: number = 0,
    readonly weight: number = 0
  ) {}

  calculateVolume() {
    this.#volume =
      (this.height / this.#CENTIMETERS) *
      (this.width / this.#CENTIMETERS) *
      (this.length / this.#CENTIMETERS);

    return this.#volume;
  }

  calculateDensity() {
    return this.weight / this.#volume;
  }
}

export default Item;
