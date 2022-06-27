import StockEntry from "../../domain/entity/StockEntry";
import OrderPlaced from "../../domain/event/OrderPlaced";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import DomainEvent from "../../infra/broker/DomainEvent";
import Handler from "../../infra/broker/Handler";

class OrderPlacedStockHandler implements Handler {
  name: string;
  stockEntryRepository: StockEntryRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.name = "OrderPlaced";
    this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
  }

  handle(event: OrderPlaced): void {
    for (const orderItem of event.order.getOrderItems()) {
      this.stockEntryRepository.save(
        new StockEntry(
          orderItem.idItem,
          "out",
          orderItem.quantity,
          event.order.date
        )
      );
    }
  }
}

export default OrderPlacedStockHandler;
