import { type Model, Schema, model } from 'mongoose';
import type { UserModel, UserResult } from '../types/user';

const userSchema = new Schema<UserResult, Model<UserModel>>(
  {
    name: {
      type: String,
      required: [true, '姓名未填寫'],
      trim: true
    },
    gender: {
      type: String,
      default: 'male',
      enum: ['male', 'female'],
      trim: true
    },
    phone: {
      type: String,
      default: '',
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email 未填寫'],
      index: true,
      unique: true,
      lowercase: true,
      select: true,
      trim: true
    },
    photo: {
      type: String,
      default: '',
      trim: true
    },
    password: {
      type: String,
      required: [true, '密碼未填寫'],
      select: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export const User = model('User', userSchema);
