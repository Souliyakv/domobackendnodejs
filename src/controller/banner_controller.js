import { UploadImagee } from "../config/cloudinary.js";
import { getConnection } from "../config/db.js";
import { ADDBANNER, DELETEBANNER } from "../model/banner.js";

export const AddBannerController = async (req, res) => {
  try {
    const { title, detail, image } = req.body;
    if (!title) return res.json({ msg: "ກະລຸນາໃສ່ຫົວຂໍ້" });
    if (!detail) return res.json({ msg: "ກະລຸນາໃສ່ລາຍລະອຽດ" });
    if (!image) return res.json({ msg: "ກະລຸນາໃສ່ຮູບພາບ" });
    const imageURL = await UploadImagee(image);
    const con = getConnection();
    const values = [[title, detail, imageURL]];
    con.query(ADDBANNER, [values], (err, result) => {
      if (err) throw err;
      if (result.affectedRows == 1) {
        return res.json({ type: "success", msg: "ເພີ່ມລາຍການສຳເຫຼັດ" });
      }
      return (
        res,
        json({ type: "err", ma: "ບໍ່ສາມາດເພີ່ມລາຍການໄດ້ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ" })
      );
    });
  } catch (error) {
    return console.log(error);
  }
};

export const DeleteBannerController = (req, res) => {
  try {
    const id = req.body.id;
    if (!id) return res.json({ msg: "ກະລຸນາເລືອກລາຍການທີ່ຕ້ອງການລົບ" });
    const con = getConnection();
    con.query(DELETEBANNER, [id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows == 1) {
        return res.json({ type: "success", msg: "ການລຶບສຳເຫຼັດ" });
      }
      return res.json({
        type: "err",
        msg: "ບໍ່ສາມາດລຶບໄດ້ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ",
      });
    });
  } catch (error) {
    return console.log(error);
  }
};
