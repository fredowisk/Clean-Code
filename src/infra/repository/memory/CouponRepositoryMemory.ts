import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";

class CouponRepositoryMemory implements CouponRepository {
  #coupons: Coupon[];

  constructor() {
    this.#coupons = [
      new Coupon("VALE20", 20),
      new Coupon("VALE30", 30),
      new Coupon("VALE40", 40, new Date("2022/06/01")),
    ];
  }
  findByCode(code: string): Promise<Coupon | undefined> {
    return Promise.resolve(
      this.#coupons.find((coupon) => coupon.code === code)
    );
  }
}

export default CouponRepositoryMemory;
