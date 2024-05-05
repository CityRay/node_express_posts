import type { Response } from 'express';
import type { UserResult } from 'src/types/user';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { handleResponse } from '../handleResponse';

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
