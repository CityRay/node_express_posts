import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadRequest extends Request {
  user: JwtPayload;
}

export interface UserModel {
  name: string;
  nickname: string;
  gender: string;
  phone: string;
  email: string;
  photo: string;
  password: string;
}

export interface UserResult extends UserModel {
  _id: string;
}
