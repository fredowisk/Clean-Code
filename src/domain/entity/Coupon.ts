class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expireDate?: Date
  ) {}

  isValid(today: Date = new Date()) {
    if (!this.expireDate) return true;
    return this.expireDate.getTime() >= today.getTime();
  }

  calculateDiscount(total: number) {
    return total * (this.percentage / 100);
  }
}

export default Coupon;
