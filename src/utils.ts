import CryptoJS from "crypto-js";
import { nanoid } from "nanoid";
import { API } from "aws-amplify";
import { updateSecret, deleteSecret } from "./graphql/mutations";


// code to encrypt text
export const encryptText = (secret: string, password: string) =>
  CryptoJS.AES.encrypt(secret, password).toString();
// code to decrypt
export const decryptText = (secret: string, password: string) =>
  CryptoJS.AES.decrypt(secret, password).toString(CryptoJS.enc.Utf8);

export const createID = () => nanoid();

// deletes secret from cloud
export const destroySecret = async (id: string) => {
  try {
    await API.graphql({
      query: deleteSecret,
      variables: {input: {id}},
      authMode: "AWS_IAM"
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateSecretDecryptAttempts = async (input: {
  id: string;
  decryptAttempts: number;
}) => {
  try {
    await API.graphql({
      query: updateSecret,
      variables: {input: {...input}},
      authMode: "AWS_IAM"
    });
  } catch (error) {
    console.log(error);
  }
};
