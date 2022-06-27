import StockEntry from "../../../domain/entity/StockEntry";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";
import SaveStockInput from "./SaveStockInput";

class SaveStock {
  stockEntryRepository: StockEntryRepository;
  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
  }

  async execute(input: SaveStockInput): Promise<void> {
    this.stockEntryRepository.save(
      new StockEntry(input.idItem, input.operation, input.quantity, new Date())
    );
  }
}

export default SaveStock;
