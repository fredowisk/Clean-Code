import express, { Express, Request, Response } from "express";
import Http from "./Http";

class ExpressAdapter implements Http {
  app: Express | any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(url: string, method: string, fn: any): void {
    this.app[method](url, async (req: Request, res: Response) => {
      const output = await fn(req.params, req.body);
      res.json(output);
    });
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}

export default ExpressAdapter;
