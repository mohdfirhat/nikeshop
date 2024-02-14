// src/types/express/index.d.ts
import { Express } from "express-serve-static-core";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface User {
      id: string;
      isAdmin: boolean;
    }
  }
}
