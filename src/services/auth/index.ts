import { User } from '../../models';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { handleAppError, handleErrorAsync, handleResponse } from '../handleResponse';

import type { NextFunction, Request, Response } from 'express';
import type { JwtPayloadRequest, UserResult } from 'src/types/user';

// 產生 JWT
const signToken = (id: string) => {
  return jwt.sign({ id }, config.JWT_SECRET!, {
    expiresIn: config.JWT_EXPIRES_DAYS
  });
};

export const generateSendJWT = (user: UserResult, statusCode: number, res: Response) => {
  // generate token
  const token = signToken(user._id);
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
    '註冊成功'
  );
};

export const verifyToken = handleErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, config.JWT_SECRET!, (err, payload) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(payload);
      });
    });

    const getUser = await User.findById((decoded as any).id);

    if (!getUser) {
      handleAppError(401, '使用者不存在', next);
      return;
    }

    (req as JwtPayloadRequest).user = getUser;
    next();
  }
);
