import { type UserResult } from '../types/user';
import { type NextFunction, type Request, type Response } from 'express';
import { handleResponse, handleAppError } from '../services/handleResponse';
import { User } from '../models';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { generateSendJWT } from '../services/auth';

export const userController = {
  // 取得全部
  async getUserList(req: Request, res: Response) {
    const user: UserResult[] = await User.find();
    handleResponse(res, user, '取得成功');
  },
  // 取得單一User
  async getUser(req: Request, res: Response, next: NextFunction) {
    const _id = req.params.id;
    const userData = await User.findOne({ _id });

    if (!userData) {
      handleAppError(404, '找不到使用者', next);
      return;
    }

    handleResponse(res, userData, '取得成功');
  },
  // 註冊
  async signup(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      handleAppError(400, '請填寫所有欄位', next);
      return;
    }

    if (password !== confirmPassword) {
      handleAppError(400, '密碼不一致', next);
      return;
    }

    if (password.length < 8) {
      handleAppError(400, '密碼長度不足，最少8碼', next);
      return;
    }

    if (!validator.isEmail(email)) {
      handleAppError(400, 'Email格式錯誤', next);
      return;
    }

    // bcrypt 第一個參數是要加密的字串，第二個參數是加密強度
    const cryptPwd = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: cryptPwd
    });

    generateSendJWT(newUser, 201, res);
  }
};
