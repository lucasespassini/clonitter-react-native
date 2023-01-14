export interface IUser {
  usr_user_name: string;
  usr_name: string;
  profile?: {
    prf_image: string;
    prf_bio: string;
    prf_followers: number;
    prf_followings: number;
  }
  posts?: IPost[];
}

export interface IPost {
  pst_uuid: string;
  pst_content: string;
  pst_createdAt: string;
  user: IUser;
  comments: any[];
}