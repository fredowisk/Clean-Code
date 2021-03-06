import StockEntry from "../entity/StockEntry";

interface StockEntryRepository {
  getByIdItem(idItem: number): Promise<StockEntry[]>;
  save(stockEntry: StockEntry): Promise<void>;
  clear(): Promise<void>;
}

export default StockEntryRepository;
