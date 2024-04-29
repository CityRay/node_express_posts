import { type Request, type Response, type NextFunction } from 'express';

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
  return res.status(404).json({
    status: 'false',
    message: '請檢查路由資訊'
  });
}
