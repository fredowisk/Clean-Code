import StockEntry from "../../../domain/entity/StockEntry";

test("should create a stock entry", () => {
  const stockEntry = new StockEntry(
    1,
    "in",
    10,
    new Date("2022-06-01T10:00:00")
  );
  expect(stockEntry.idItem).toBe(1);
  expect(stockEntry.operation).toBe("in");
  expect(stockEntry.quantity).toBe(10);
  expect(stockEntry.date).toEqual(new Date("2022-06-01T10:00:00"));
});
