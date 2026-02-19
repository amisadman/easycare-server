import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { AuthService } from "./auth.service";
import { tokenUtils } from "../../utils/token";
import { cookieUtils } from "../../utils/cookie";
import AppError from "../../errorsHelpers/AppError";
import status from "http-status";
import { IChangePasswordPayload, IVerifyEmailPayload } from "./auth.interface";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  console.log(payload);

  const result = await AuthService.registerPatient(payload);
  const { accessToken, refreshToken, token, ...rest } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Patient registered successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log(user);
  const result = await AuthService.getMe(user.id);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User retrieved successfully",
    data: {
      ...result,
    },
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthService.loginUser(payload);
  const { accessToken, refreshToken, token, ...rest } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

const getNewToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const oldSessionToken = cookieUtils.getCookie(
      req,
      "better-auth.session_token",
    );
    const oldRefreshToken = cookieUtils.getCookie(req, "refreshToken");

    if (!oldRefreshToken) {
      throw new AppError(status.UNAUTHORIZED, "Refresh Token Not Found!");
    }

    const { accessToken, refreshToken, sessionToken } =
      await AuthService.getNewToken(oldSessionToken, oldRefreshToken);

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, sessionToken);
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "New tokens generated successfully",
      data: {
        accessToken,
        refreshToken,
        sessionToken,
      },
    });
  },
);

const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload: IChangePasswordPayload = req.body;
    const sessionToken = cookieUtils.getCookie(
      req,
      "better-auth.session_token",
    );

    const result = await AuthService.changePassword(payload, sessionToken);
    const { accessToken, refreshToken, token } = result;
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, token as string);
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Password Changed successfully",
      data: {
        ...result,
      },
    });
  },
);

const logout = catchAsync(async (req: Request, res: Response) => {
  const sessionToken = cookieUtils.getCookie(req, "better-auth.session_token");
  const result = await AuthService.logout(sessionToken);

  cookieUtils.clearCookie(res, "accessToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  cookieUtils.clearCookie(res, "refreshToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  cookieUtils.clearCookie(res, "better-auth.session_token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    data: result,
  });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {

  const payload : IVerifyEmailPayload = req.body;

  await AuthService.varifyEmail(payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Email verified successfully",
  });
});
export const AuthController = {
  registerPatient,
  loginUser,
  getMe,
  getNewToken,
  changePassword,
  logout,
  verifyEmail
};
