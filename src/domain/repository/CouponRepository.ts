import Coupon from "../entity/Coupon";

interface CouponRepository {
  findByCode(code: string): Promise<Coupon | undefined>;
}

export default CouponRepository;
