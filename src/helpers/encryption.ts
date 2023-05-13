import crypto from "crypto";
import { config } from "dotenv";

config();

const key = process.env.ENCRYPTION_KEY as string;

export default class Encryption {
  public static encrypt(data: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-ocb", Buffer.from(key), iv);
    const encrypted = cipher.update(data);
    const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
    return Buffer.concat([iv, finalBuffer]).toString("base64");
  }

  public static decrypt(data: string): string {
    const encryptedBuffer = Buffer.from(data, "base64");
    const iv = encryptedBuffer.slice(0, 16);
    const encrypted = encryptedBuffer.slice(16);
    const decipher = crypto.createDecipheriv(
      "aes-256-ocb",
      Buffer.from(key),
      iv
    );
    const decrypt = decipher.update(encrypted);
    const finalBuffer = Buffer.concat([decrypt, decipher.final()]);
    return finalBuffer.toString();
  }

  public static validateChar(data: string) {
    return /[^a-zA-Z0-9.:,\-\s@]/g.test(data) ? true : false;
  }
}
