import type { JwtPayloadRequest } from '../types/user';
import { type NextFunction, type Request, type Response } from 'express';
import { handleResponse, handleAppError } from '../services/handleResponse';
import { User } from '../models';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { generateSendJWT } from '../services/auth';

export const userController = {
  // 取得個人資料
  async getProfile(req: Request, res: Response, next: NextFunction) {
    const getUser = await User.findById((req as JwtPayloadRequest).user._id);
    if (!getUser) {
      handleAppError(404, '找不到使用者', next);
      return;
    }

    handleResponse(res, getUser, '取得成功');
  },
  // 註冊
  async signup(req: Request, res: Response, next: NextFunction) {
    const { name, email, gender, password, confirmPassword } = req.body;

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
      gender,
      password: cryptPwd
    });

    generateSendJWT(newUser, 201, res);
  },
  // 登入
  async signin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      handleAppError(400, '帳號密碼不可為空', next);
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

    const getUser = await User.findOne({ email }).select('+password');
    if (!getUser) {
      handleAppError(404, '找不到使用者', next);
      return;
    }

    const isAuth = await bcrypt.compare(password, getUser.password);

    if (!isAuth) {
      handleAppError(400, '密碼不正確', next);
    }

    generateSendJWT(getUser, 201, res);
  },
  // 重設密碼
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      handleAppError(400, '密碼不一致', next);
      return;
    }

    if (password.length < 8) {
      handleAppError(400, '密碼長度不足，最少8碼', next);
      return;
    }

    const cryptPwd = await bcrypt.hash(password, 12);
    const updateUser = await User.findByIdAndUpdate(
      (req as JwtPayloadRequest).user._id,
      { password: cryptPwd },
      { new: true }
    );

    handleResponse(res, updateUser, '修改成功');
  }
};
