class GetOrdersOutput {
  constructor(
    readonly orders: { code: string; total: number }[]
  ) // readonly coupon: string,
  // readonly cpf: string,
  // readonly date: Date,
  // readonly freight: number
  {}
}

export default GetOrdersOutput;
