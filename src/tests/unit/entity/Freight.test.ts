import FreightCalculator from "../../../domain/entity/FreightCalculator";
import Item from "../../../domain/entity/Item";

test("Should return the minimum freight value if the total is less than R$10", () => {
  const idItem = 1;
  const category = "Music";
  const description = "Pink Floy DVD";
  const price = 100;
  const width = 20;
  const height = 15;
  const length = 10;
  const weight = 1;

  expect(
    new FreightCalculator().calculate(
      new Item(
        idItem,
        category,
        description,
        price,
        width,
        height,
        length,
        weight
      )
    )
  ).toBe(10);
});

test("Should return the freight value successfully", () => {
  const idItem = 1;
  const category = "Music";
  const description = "Pink Floy DVD";
  const price = 100;
  const width = 100;
  const height = 30;
  const length = 10;
  const weight = 3;

  expect(
    new FreightCalculator().calculate(
      new Item(
        idItem,
        category,
        description,
        price,
        width,
        height,
        length,
        weight
      )
    )
  ).toBe(30);
});
