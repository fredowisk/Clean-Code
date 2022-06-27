class StockEntry {
  constructor(
    readonly idItem: number,
    readonly operation: string,
    readonly quantity: number,
    readonly date: Date
  ) {}
}

export default StockEntry;
