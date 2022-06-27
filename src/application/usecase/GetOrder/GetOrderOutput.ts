class GetOrderOutput {
  constructor(
    readonly code: string,
    readonly total: number,
    // readonly coupon: string,
    // readonly cpf: string,
    // readonly date: Date,
    // readonly freight: number
  ) {}
}

export default GetOrderOutput;
