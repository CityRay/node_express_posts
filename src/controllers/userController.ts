import { type UserResult } from '../types/user';
import { type NextFunction, type Request, type Response } from 'express';
import { handleResponse, handleAppError } from '../services/handleResponse';
import User from '../models/userModel';

const userController = {
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
  }
};

export default userController;
