import { Optional } from "sequelize";

export interface UserAttributes {
  id: number;
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  isVerified?: boolean;
  balance?: number;
  imageUrl?: string;
  phoneNumber?: string;
  StoreId?: number | null;
  role?: string;
  point: number;
  exp: number;
}

export interface UserInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  fullName: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  balance: number;
  imageUrl: string;
  phoneNumber: string;
  StoreId?: number | null;
  role: string;
  point: number;
  exp: number;
}

export interface TopUpAttributes {
  amount?: number;
  UserId?: number;
  status?: string;
}

export interface TopUpInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  amount: number;
  UserId: number;
  status: string;
}

export interface FollowingAttributes {
  UserId?: number;
  StoreId?: number | null;
}

export type FollowingCreationAttributes = Optional<
  FollowingAttributes,
  "UserId"
>;

export interface FollowingInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  UserId: number;
  StoreId: number | null;
}

export interface AchievementAttributes {
  AchievementId?: string;
  UserId: number;
}

export interface AchievementInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  AchievementId: string;
  UserId: number;
}
