import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "gg_admin";
const SESSION_HOURS = 8;

function secret(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function isConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.BLOB_READ_WRITE_TOKEN);
}

export function checkPassword(password: string): boolean {
  const expected = secret();
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Stateless session token: "<expiryMs>.<hmac(expiryMs)>", keyed on the admin password. */
export function makeToken(): string {
  const exp = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const sig = createHmac("sha256", secret()).update(String(exp)).digest("hex");
  return `${exp}.${sig}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token || !secret()) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!exp || !sig || Date.now() > exp) return false;
  const expected = createHmac("sha256", secret()).update(expStr).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const SESSION_MAX_AGE = SESSION_HOURS * 60 * 60;
