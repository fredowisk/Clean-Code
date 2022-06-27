import ValidateCoupon from "../../../application/usecase/ValidateCoupon/ValidateCoupon";
import PgPromiseConnectionAdapter from "../../../infra/database/PgPromiseConnectionAdapter";
import CouponRepositoryDatabase from "../../../infra/repository/database/CouponRepositoryDatabase";

let validateCoupon: ValidateCoupon;

beforeAll(() => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const couponRepository = new CouponRepositoryDatabase(connection);

  validateCoupon = new ValidateCoupon(couponRepository);
});

test("Should return true if the coupon is valid", async () => {
  const output = await validateCoupon.execute("VALE20");
  expect(output).toBeTruthy();
});

test("Should return false if the coupon is expired", async () => {
  const output = await validateCoupon.execute("VALE20_EXPIRED");
  expect(output).toBeFalsy();
});

test("Should throw an error if the coupon doesnt exist", async () => {
  await expect(validateCoupon.execute("VALE5000")).rejects.toThrow(
    "Coupon not found!"
  );
});
