import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "./passport";
import routes from "./routes";
import { isCI, isDevelopment, isTest } from "./utils/environment";

const bypassCors = isCI() || isDevelopment() || isTest();
const allowList = new Set(["http://localhost:3000", "http://10.0.0.139:4000"]);

const corsOptions = {
  origin: (origin: string, callback: any) => {
    if (bypassCors || allowList.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express()
  .use(cors(corsOptions))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(routes)
  .use(
    session({
      secret: "this is totally secret",
      resave: false,
      saveUninitialized: false,
    })
  );

passport(app);

export default app;
