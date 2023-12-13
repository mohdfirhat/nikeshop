// src/types/express/index.d.ts
import { Express } from "express-serve-static-core";
import { jwtDecodeModel } from "../custom";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      user?: jwtDecodeModel;
    }
  }
}
