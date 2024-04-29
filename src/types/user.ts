export interface UserModel {
  name: string;
  email: string;
  photo: string;
}

export interface UserResult extends UserModel {
  _id: string;
}
