import { NextFunction, Request, Response } from "express";
import { cookieUtils } from "../utils/cookie";
import status from "http-status";
import AppError from "../errorsHelpers/AppError";
import { prisma } from "../lib/prisma";
import { Role, UserStatus } from "../../generated/prisma/browser";
import { envVars } from "../config";
import { jwtUtils } from "../utils/jwt";

export const checkAuth =
  (...allowedRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionToken = cookieUtils.getCookie(
        req,
        "better-auth.session_token",
      );

      if (!sessionToken) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized: No session token provided",
        );
      }

      if (sessionToken) {
        const sessionExists = await prisma.session.findUnique({
          where: {
            token: sessionToken,
            expiresAt: {
              gt: new Date(),
            },
          },
          include: {
            user: true,
          },
        });

        if (sessionExists && sessionExists.user) {
          const user = sessionExists.user;

          const now = new Date();
          const createdAt = sessionExists.createdAt;
          const expiresAt = sessionExists.expiresAt;
          const lifeTime = expiresAt.getTime() - createdAt.getTime();
          const timeRemining = expiresAt.getTime() - now.getTime();
          const parcentRemining = (timeRemining / lifeTime) * 100;
          if (parcentRemining < 20) {
            res.setHeader("X-Session-Refresh", "true");
            res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
            res.setHeader("X-Time-Remining", timeRemining.toString());

            console.log("session expiring soon!!!");
          }
          if (
            user.status === UserStatus.BLOCKED ||
            user.status === UserStatus.DELETED
          ) {
            throw new AppError(
              status.UNAUTHORIZED,
              "Unauthorized access! User is not active.",
            );
          }

          if (user.isDeleted) {
            throw new AppError(
              status.UNAUTHORIZED,
              "Unauthorized access! User is deleted.",
            );
          }

          if (
            allowedRoles.length > 0 &&
            !allowedRoles.includes(user.role)
          ) {
            throw new AppError(
              status.FORBIDDEN,
              "Forbidden access! You do not have permission to access this resource.",
            );
          }
          const accessToken = cookieUtils.getCookie(req, "accessToken");

          if (!accessToken) {
            throw new AppError(
              status.UNAUTHORIZED,
              "Unauthorized access! No access token provided.",
            );
          }
        }
      }
      const accessToken = cookieUtils.getCookie(req, "accessToken");

      if (!accessToken) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! No access token provided.",
        );
      }

      const verifiedToken = jwtUtils.verifyToken(
        accessToken,
        envVars.ACCESS_TOKEN_SECRET,
      );

      if (!verifiedToken.success) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! Invalid access token.",
        );
      }

      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(verifiedToken.data!.role as Role)
      ) {
        throw new AppError(
          status.FORBIDDEN,
          "Forbidden access! You do not have permission to access this resource.",
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
