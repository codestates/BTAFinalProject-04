import { Request, Response, NextFunction } from 'express';

export default interface IMiddleware {
  (req: Request, res: Response, next: NextFunction ): void;
}