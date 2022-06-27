import Freight from "./Freight";

class FixedFreightCalculator implements Freight {
  calculate(): number {
    return 10;
  }
}

export default FixedFreightCalculator;
