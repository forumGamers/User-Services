export interface multipleUserById {
  username: string;
  imageUrl: string;
  id: number;
  UUID: string;
  bio?: string;
  isFollowed: boolean;
}

export interface requestUser {
  id: number;
  email: string;
  username: string;
  isVerified: boolean;
  StoreId: number;
  role: "admin" | "user";
  point: number;
  experience: number;
  image: string | undefined;
}
