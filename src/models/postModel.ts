import { type Model, Schema, model } from 'mongoose';
import type { PostModel, PostResult } from '../types/post';

const postSchema = new Schema<PostResult, Model<PostModel>>(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User', // Model 定義的名稱
      required: [true, '使用者未填寫'],
      trim: true
    },
    title: {
      type: String,
      required: [true, '標題未填寫'],
      trim: true
    },
    content: {
      type: String,
      required: [true, '文章內容未填寫'],
      trim: true
    },
    tag: {
      type: [String],
      enum: ['有趣', '新聞', '生活', '教學', '心情', '其他'],
      default: []
    },
    image: {
      type: String,
      default: '',
      trim: true
    },
    likes: [
      {
        type: Schema.ObjectId,
        ref: 'User'
      }
    ],
    comments: {
      type: Number,
      default: 0
    },
    isPublic: {
      type: Boolean,
      default: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export const Post = model('Post', postSchema);
