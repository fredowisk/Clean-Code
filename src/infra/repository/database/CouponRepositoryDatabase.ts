import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";
import Connection from "../../database/Connection";

class CouponRepositoryDatabase implements CouponRepository {
  constructor(readonly connection: Connection) {}

  async findByCode(code: string): Promise<Coupon | undefined> {
    const [coupon] = await this.connection.query(
      "select * from ccca.coupon where code = $1",
      [code]
    );
    if (!coupon) return undefined;
    const { percentage, expire_date } = coupon;
    return new Coupon(code, percentage, expire_date);
  }
}

export default CouponRepositoryDatabase;
