export interface UserModel {
  name: string;
  gender: string;
  phone: string;
  email: string;
  photo: string;
  password: string;
}

export interface UserResult extends UserModel {
  _id: string;
}
