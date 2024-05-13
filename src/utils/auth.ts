import jwt from 'jsonwebtoken';
import { config } from '../config';

// 產生 JWT
export const generateSignToken = (id: string) => {
  return jwt.sign({ id }, config.JWT_SECRET ?? '', {
    expiresIn: config.JWT_EXPIRES_DAYS
  });
};

// 驗證 JWT
export const verifyToken = async (token: string) => {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, payload) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(payload);
    });
  });
};
