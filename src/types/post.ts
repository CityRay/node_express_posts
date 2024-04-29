import { type Types } from 'mongoose';

export interface PostModel {
  user: Types.ObjectId;
  title: string;
  content: string;
  tag: string[];
  image: string;
  likes: string[];
  comments: number;
  isPublic: boolean;
}

export interface PostResult extends PostModel {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
