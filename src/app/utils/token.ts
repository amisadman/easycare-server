import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import { envVars } from "../config";
import { cookieUtils } from "./cookie";
import { Response } from "express";
import ms, { StringValue } from "ms";
import { set } from "zod";

const getAccessToken = (payload: JwtPayload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    envVars.ACCESS_TOKEN_SECRET,
    { expiresIn: envVars.ACCESS_TOKEN_EXPIRATION } as SignOptions,
  );
  return accessToken;
};

const getRefreshToken = (payload: JwtPayload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    envVars.REFRESH_TOKEN_SECRET,
    { expiresIn: envVars.REFRESH_TOKEN_EXPIRATION } as SignOptions,
  );
  return refreshToken;
};

const setAccessTokenCookie = (res: Response, accessToken: string) => {
  const maxAge = 60 * 60 * 24 * 1000; // 1 day in seconds
  return cookieUtils.setCookie(res, "accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: maxAge,
  });
};
const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  const maxAge = 60 * 60 * 24 * 7 * 1000; // 7 days in seconds
  return cookieUtils.setCookie(res, "refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: maxAge,
    path: "/",
  });
};
const setBetterAuthSessionCookie = (res: Response, refreshToken: string) => {
  const maxAge = 60 * 60 * 24 * 1000; // 1 day in seconds
  return cookieUtils.setCookie(res, "better-auth.session_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: maxAge,
    path: "/",
  });
};

export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie,
};
