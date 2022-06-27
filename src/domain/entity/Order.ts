import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Freight from "./Freight";
import FreightCalculator from "./FreightCalculator";
import Item from "./Item";
import OrderCode from "./OrderCode";
import OrderItem from "./OrderItem";

class Order {
  #orderCode: OrderCode;
  #orderItems: OrderItem[];
  #coupon: Coupon | undefined;
  #freight: number;
  #total: number;
  #cpf: Cpf;

  constructor(
    readonly cpf: string,
    readonly date: Date = new Date(),
    readonly freightCalculator: Freight = new FreightCalculator(),
    readonly sequence: number = 1
  ) {
    this.#cpf = new Cpf(cpf);
    this.#freight = 0;
    this.#orderItems = [];
    this.#orderCode = new OrderCode(date, sequence);
    this.#total = 0;
  }

  addItem(item: Item, quantity: number) {
    this.#freight += this.freightCalculator.calculate(item) * quantity || 0;
    const { idItem, price } = item;
    this.#orderItems.push(new OrderItem(idItem, price, quantity));
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isValid(this.date)) return;
    this.#coupon = coupon;
  }

  getFreight() {
    return this.#freight;
  }

  getCoupon() {
    return this.#coupon;
  }

  getCode() {
    return this.#orderCode.value;
  }

  getCpf() {
    return this.#cpf.value;
  }

  getOrderItems() {
    return this.#orderItems;
  }

  getTotalValue() {
    return this.#total;
  }

  getTotal() {
    for (const orderItem of this.#orderItems) {
      this.#total += orderItem.getTotal();
    }
    if (this.#coupon) {
      this.#total -= this.#coupon.calculateDiscount(this.#total);
    }

    this.#total += this.getFreight();
    return this.#total;
  }
}

export default Order;
