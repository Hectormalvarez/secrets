import CryptoJS from "crypto-js";
import { nanoid } from "nanoid";

// code to encrypt text
export const encryptText = (secret: string, password: string) =>
  CryptoJS.AES.encrypt(secret, password).toString();
// code to decrypt
export const decryptText = (secret: string, password: string) =>
  CryptoJS.AES.decrypt(secret, password).toString(CryptoJS.enc.Utf8);

export const createID = () => nanoid();
