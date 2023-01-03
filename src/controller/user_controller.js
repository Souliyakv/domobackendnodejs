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
    if (!fname) return res.json({ status: false, msg: "ກະລຸນາໃສ່ຊື່ຂອງເຈົ້າ" });
    if (!lname)
      return res.json({ status: false, msg: "ກະລຸນາໃສ່ນາມສະກຸນຂອງເຈົ້າ" });
    if (!phone || phone.length < 8)
      return res.json({ status: false, msg: "ເບີໂທລະສັບຕ້ອງມີ 8 ໂຕອັກສອນ" });
    if (!password || password.length < 6)
      return res.json({
        status: false,
        msg: "ລະຫັດຜ່ານຕ້ອງມີ 6 ໂຕອັນສອນຂື້ນໄປ",
      });
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
            status: true,
            msg: "ສ້າງບັນຊີຜູ້ໃຊ້ສຳເຫຼັດ",
            token: token,
          });
        });
      } else {
        return res.json({ status: false, msg: "ມີຊື່ຜູ້ໃຊ້ນີ້ແລ້ວ" });
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
    if (!phone || phone.length < 8)
      return res.json({ status: false, msg: "ເບີໂທລະສັບຕ້ອງມີ 8 ໂຕອັກສອນ" });
    if (!password || password.length < 6)
      return res.json({
        status: false,
        msg: "ລະຫັດຜ່ານຕ້ອງມີ 6 ໂຕອັນສອນຂື້ນໄປ",
      });

    con.query(CHECKPHONE, [phone], async (err, result) => {
      if (err) throw err;

      if (result === undefined || result.length <= 0) {
        return res.json({ status: false, msg: "ບໍ່ມີບັນຊີຜູ້ໃຊ້ນີ້" });
      } else {
        const checkPassword = await comparePassword(
          password,
          result[0].password
        );

        if (!checkPassword)  return res.json({ status: false, msg: "ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ" });
        const token = generateToken(result[0].USER_ID);

        return res.json({
          status: true,
          msg: "ເຂົ້າສູ່ລະບົບສຳເຫຼັດ",
          data: result[0],
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
      return res.json({ status: true, result: result });
    });
  } catch (error) {
    return console.log(error);
  }
};
