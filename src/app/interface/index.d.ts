import { IRequestUserPayload } from "./IRequestUserPayload";

declare global {
  namespace Express {
    interface Request {
      user: IRequestUserPayload;
    }
  }
}
