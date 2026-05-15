import { Request } from "express";

export interface RegisterDto {
  name: string,
  email: string,
  password: string,
}

export interface LoginDto {
  email: string,
  password: string,
}

export interface admin extends Request {
  admin?: any
}