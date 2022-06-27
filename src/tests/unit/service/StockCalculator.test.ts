import StockEntry from "../../../domain/entity/StockEntry";
import StockCalculator from "../../../domain/service/StockCalculator";

test("should calculate the available stock for an item", () => {
  const stockCalculator = new StockCalculator();
  const stockEntries = [
    new StockEntry(1, "in", 10, new Date("2022-06-01T10:00:00")),
    new StockEntry(1, "out", 5, new Date("2022-06-02T10:00:00")),
  ];

  const total = stockCalculator.calculate(stockEntries);
  expect(total).toBe(5);
});
