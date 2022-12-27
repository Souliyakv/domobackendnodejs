import { UploadImagee } from "../config/cloudinary.js";
import { getConnection } from "../config/db.js";
import {
  comparePassword,
  genPassword,
  generateToken,
} from "../middleware/auth.js";
import { CHECKPHONE, GETALLUSERS, REGISTER } from "../model/user.js";

export const Register_Controller = (req, res) => {
  const con = getConnection();
  try {
    const { fname, lname, phone, password, profile } = req.body;
    if (!fname) return res.json({ msg: "ກະລຸນາໃສ່ຊື່ຂອງເຈົ້າ" });
    if (!lname) return res.json({ msg: "ກະລຸນາໃສ່ນາມສະກຸນຂອງເຈົ້າ" });
    if (!phone) return res.json({ msg: "ກະລຸນາໃສ່ເບີໂທລະສັບຂອງເຈົ້າ" });
    if (!password) return res.json({ msg: "ໃສ່ລະຫັດຜ່ານຂອງເຈົ້າ" });
    con.query(CHECKPHONE, [phone], async (err, result) => {
      if (err) throw err;

      if (result === undefined || result.length <= 0) {
        const genpassword = await genPassword(password);
        const image = await UploadImagee(profile);
        const values = [[fname, lname, phone, genpassword, image]];
        con.query(REGISTER, [values], (err, result) => {
          if (err) throw err;
          const token = generateToken(result.insertId);
          return res.json({
            type: "success",
            msg: "ສ້າງບັນຊີຜູ້ໃຊ້ສຳເຫຼັດ",
            token: token,
          });
        });
      } else {
        return res.json({ type: "err", msg: "ມີຊື່ຜູ້ໃຊ້ນີ້ແລ້ວ" });
      }
    });
  } catch (error) {
    return console.log(error);
  }
};

export const Login_Controller = (req, res) => {
  try {
    const con = getConnection();
    const { phone, password } = req.body;
    if (!phone) return res.json({ msg: "ກະລຸນາໃສ່ເບີໂທລະສັບຂອງເຈົ້າ" });
    if (!password) return res.json({ msg: "ກະລຸນາໃສ່ລະຫັດຜ່ານຂອງເຈົ້າ" });
    con.query(CHECKPHONE, [phone], async (err, result) => {
      if (err) throw err;
      if (result === undefined || result.length <= 0) {
        return res.json({ type: "err", msg: "ບໍ່ມີບັນຊີຜູ້ໃຊ້ນີ້" });
      } else {
        const checkPassword = await comparePassword(
          password,
          result[0].password
        );
        if (!checkPassword)
          return res.json({ type: "err", msg: "ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ" });
        const token = generateToken(result[0].USER_ID);
        return res.json({
          type: "success",
          msg: "ເຂົ້າສູ່ລະບົບສຳເຫຼັດ",
          token: token,
        });
      }
    });
  } catch (error) {
    return console.log(error);
  }
};

export const getAllUSer_Controller = (req, res) => {
  try {
    const con = getConnection();
    con.query(GETALLUSERS, (err, result) => {
      if (err) throw err;
      return res.json({ type: "success", result: result });
    });
  } catch (error) {
    return console.log(error);
  }
};
