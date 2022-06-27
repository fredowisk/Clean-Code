interface Connection {
  query(statement: string, params: any[]): Promise<any>;
}

export default Connection;
