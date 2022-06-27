import GetStock from "../../../application/usecase/GetStock/GetStock";
import SaveStock from "../../../application/usecase/SaveStock/SaveStock";
import DatabaseRepositoryFactory from "../../../infra/factory/DatabaseRepositoryFactory";

test("should get a stock of an item", async () => {
  const repositoryFactory = new DatabaseRepositoryFactory();
  const stockEntryRepository = repositoryFactory.createStockEntryRepository();
  await stockEntryRepository.clear();
  const saveStock = new SaveStock(repositoryFactory);
  const saveStockInput = {
    idItem: 1,
    operation: "in",
    quantity: 10,
  };
  await saveStock.execute(saveStockInput);
  const getStock = new GetStock(repositoryFactory);
  const total = await getStock.execute(1);
  expect(total).toBe(10);
});
