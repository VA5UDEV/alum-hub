import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

declare global {
  // prevent duplicate instances in dev
  // eslint-disable-next-line no-var
  var _db: ReturnType<typeof drizzle> | undefined;
  var _sql: ReturnType<typeof neon> | undefined;
}

const _sql = global._sql ?? neon(process.env.DATABASE_URL!);
export const db = global._db ?? drizzle(_sql, { schema });

if (!global._sql) global._sql = _sql;
if (!global._db) global._db = db;

export { _sql as sql };
