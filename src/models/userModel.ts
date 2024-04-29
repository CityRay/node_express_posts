import { Schema, model } from 'mongoose';
import type { UserModel } from '../types/user';

const userSchema = new Schema<UserModel>(
  {
    name: {
      type: String,
      required: [true, '姓名未填寫'],
      trim: true
    },

    email: {
      type: String,
      required: [true, 'Email 未填寫'],
      index: true,
      unique: true,
      lowercase: true,
      select: false,
      trim: true
    },
    photo: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    versionKey: false
  }
);
const User = model('User', userSchema);

export default User;
