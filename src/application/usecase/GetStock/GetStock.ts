import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";
import StockCalculator from "../../../domain/service/StockCalculator";

class GetStock {
  stockEntryRepository: StockEntryRepository;
  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
  }

  async execute(idItem: number): Promise<number> {
    const stockEntries = await this.stockEntryRepository.getByIdItem(idItem);
    const stockCalculator = new StockCalculator();
    return stockCalculator.calculate(stockEntries);
  }
}

export default GetStock;
