import CouponRepository from "../../../domain/repository/CouponRepository";

class ValidateCoupon {
  constructor(readonly couponRepository: CouponRepository) {}

  async execute(code: string): Promise<boolean> {
    const coupon = await this.couponRepository.findByCode(code);
    if (!coupon) throw new Error("Coupon not found!");

    return coupon.isValid();
  }
}

export default ValidateCoupon;
