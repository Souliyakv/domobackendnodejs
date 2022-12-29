import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { CHECKUSER } from "../model/user.js";
import { getConnection } from "../config/db.js";
dotenv.config();
const secret_key = process.env.SECRET_KEY;

export const genPassword = async (password) => {
  const salthas = await bcrypt.genSalt(1);
  return await bcrypt.hash(password, salthas);
};

export const comparePassword = async (password, passwordDb) => {
  return await bcrypt.compare(password, passwordDb);
};

export const generateToken = (token) => {
  return jwt.sign({ token }, secret_key, { expiresIn: "7d" });
};

export const veryfyToken = (token) => {
  const decodetoken = jwt.verify(token, secret_key, (err, decode) => {
    return decode;
  });
  return decodetoken;
};

export const CheckUSer = (req, res, next) => {
  try {
    const token = req.headers["token"];
    const data = veryfyToken(token);

    if (data === undefined || data.length <= 0) {
      return res.json({ type: "err", msg: "ກະລຸນາເຂົ້າສູ້ລະບົບ" });
    }
    const USER_ID = data.token;
    const con = getConnection();
    con.query(CHECKUSER, [USER_ID], (err, result) => {
      if (err) throw err;
      if (result === undefined || result.length <= 0) {
        return res.json({ type: "err", msg: "ບໍ່ມີສິດໃນການເບີ່ງຂໍ້ມູນ" });
      } else {
        next();
      }
    });
  } catch (error) {
    return console.log(error);
  }
};
