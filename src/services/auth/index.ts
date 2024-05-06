import { User } from '../../models';
import { handleAppError, handleErrorAsync, handleResponse } from '../handleResponse';
import { generateSignToken, verifyToken } from '../../utils/auth';

import type { NextFunction, Request, Response } from 'express';
import type { JwtPayloadRequest, UserResult } from 'src/types/user';
import type { JwtPayload } from 'jsonwebtoken';

// 產生 JWT 並回傳
export const generateSendJWT = (user: UserResult, statusCode: number, res: Response) => {
  // generate token
  const token = generateSignToken(user._id);
  handleResponse(
    res,
    {
      status: 'success',
      token,
      data: {
        name: user.name,
        email: user.email,
        photo: user.photo,
        phone: user.phone,
        gender: user.gender
      }
    },
    '成功'
  );
};

export const isAuth = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
  ) {
    handleAppError(401, '你尚未登入！', next);
    return;
  }

  const token = req.headers.authorization.split(' ')[1];

  // 驗證 token 正確性
  const decoded = await verifyToken(token);

  if (!decoded && !(decoded as JwtPayload).id) {
    handleAppError(401, '驗證失敗', next);
    return;
  }

  const getUser = await User.findById((decoded as JwtPayload).id);

  if (!getUser) {
    handleAppError(401, '使用者不存在', next);
    return;
  }

  (req as JwtPayloadRequest).user = getUser;
  next();
});
