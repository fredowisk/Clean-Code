class GetOrdersOutput {
  constructor(
    readonly orders: { code: string; total: number }[] // readonly cpf: string, // readonly coupon: string, // readonly date: Date,
  ) // readonly freight: number
  {}
}

export default GetOrdersOutput;
