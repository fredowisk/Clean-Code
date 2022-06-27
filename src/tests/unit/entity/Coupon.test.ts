import Coupon from "../../../domain/entity/Coupon";

test("Should return true when the coupon is valid", () => {
  expect(
    new Coupon("VALE20", 20, new Date("2022/06/08")).isValid(
      new Date("2022/06/01")
    )
  ).toBeTruthy();
});

test("Should return false when the coupon is invalid", () => {
  expect(
    new Coupon("VALE30", 30, new Date("2022/06/02")).isValid(
      new Date("2022/06/08")
    )
  ).toBeFalsy();
});
