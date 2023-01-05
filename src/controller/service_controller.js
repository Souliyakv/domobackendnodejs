import { UploadImagee } from "../config/cloudinary.js";
import { getConnection } from "../config/db.js";
import {
  ADDSERVICE,
  DELETESERVICE,
  DISNABLESERVICE,
  GETIMAGEURLSERVICE,
  GETSERVICE,
  UNDISNABLESERVICE,
  UPDATEDETAILSERVICE,
  UPDATEIMAGESERVICE,
  UPDATENAMESERVICE,
} from "../model/services.js";

export const AddServiceController = async (req, res) => {
  try {
    const { name, detail, image } = req.body;
    if (!name) return res.json({ msg: "ກະລຸນາໃສ່ຊື່" });
    if (!detail) return res.json({ msg: "ກະລຸນາໃສ່ລາຍລະອຽດ" });
    if (!image) return res.json({ msg: "ກະລຸນາເລືອກຮູບພາບ" });
    const imageURL = await UploadImagee(image);
    const con = getConnection();
    const values = [[name, detail, imageURL]];

    con.query(ADDSERVICE, [values], (err, result) => {
      if (err) throw err;
      if (result.affectedRows == 1) {
        return res.json({ status: true, msg: "ການເພີ່ມສຳເຫຼັດ" });
      }
      return res.json({
        status: false,
        msg: "ບໍ່ສາມາດເພີ່ມໄດ້ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ",
      });
    });
  } catch (error) {
    return console.log(error);
  }
};

export const DeleteServiceController = (req, res) => {
  try {
    const id = req.body.id;
    if (!id) return res.json({ msg: "ກະລຸນາເລືອກລາຍການທີ່ຈະລຶບ" });
    const con = getConnection();
    con.query(DELETESERVICE, [id], (err, result) => {
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

export const GetServiceController = (req, res) => {
  try {
    const con = getConnection();
    con.query(GETSERVICE, (err, result) => {
      if (err) throw err;
      return res.json({ type: "success", list: result });
    });
  } catch (error) {
    return console.log(error);
  }
};

export const UpdateNameServiceController = (req, res) => {
  try {
    const { id, newname } = req.body;
    if (!id) return res.json({ msg: "ກະລຸນາເລືອກລາຍການທີ່ຕ້ອງການປ່ຽນຊື່" });
    if (!newname) return res.json({ msg: "ກະລຸນາໃສ່ຊື່ໃໝ່" });
    const con = getConnection();
    con.query(UPDATENAMESERVICE, [newname, id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows == 1) {
        return res.json({ type: "success", msg: "ການປ່ຽນແປງສຳເຫຼັດ" });
      }
      return res.json({
        type: "err",
        msg: "ບໍ່ສາມາດແກ້ໄຂໄດ້ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ",
      });
    });
  } catch (error) {
    return console.log(error);
  }
};

export const UpdateDetailServiceController = (req, res) => {
  try {
    const { id, newdetail } = req.body;
    if (!id)
      return res.json({ msg: "ກະລຸນາເລືອກລາຍການທີ່ຕ້ອງການປ່ຽນລາຍລະອຽດ" });
    if (!newdetail) return res.json({ msg: "ກະລຸນາໃສ່ລາຍລະອຽດໃໝ່" });
    const con = getConnection();
    con.query(UPDATEDETAILSERVICE, [newdetail, id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows == 1) {
        return res.json({ type: "success", msg: "ການປ່ຽນແປງສຳເຫຼັດ" });
      }
      return res.json({
        type: "err",
        msg: "ບໍ່ສາມາດແກ້ໄຂໄດ້ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ",
      });
    });
  } catch (error) {
    return console.log(error);
  }
};

export const DisnableServiceController = (req, res) => {
  try {
    const id = req.body.id;

    if (!id)
      return res.json({ msg: "ກະລຸນາເລືອກລາຍການທີ່ຕ້ອງການຍົກເລີກຊົ່ວຄາວ" });
    const con = getConnection();
    con.query(DISNABLESERVICE, [id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows == 1) {
        return res.json({ type: "success", msg: "ຍົກເລີກສຳເຫຼັດ" });
      }
      return res.json({
        type: "err",
        msg: "ບໍ່ສາມາດຍົກເລີກໄດ້ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ",
      });
    });
  } catch (error) {
    return console.log(error);
  }
};

export const UnDisnableServiceController = (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    if (!id) return res.json({ msg: "ກະລຸນາເລືອກລາຍການທີ່ຕ້ອງການເປີດໃຊ້ງານ" });

    const con = getConnection();

    con.query(UNDISNABLESERVICE, [id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows == 1) {
        return res.json({ type: "success", msg: "ເປີດໃຊ້ງານສຳເຫຼັດ" });
      }
      return res.json({
        type: "err",
        msg: "ບໍ່ສາມາດເປີດໃຊ້ງານໄດ້ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ",
      });
    });
  } catch (error) {
    return console.log(error);
  }
};
export const ChangeImageServiceController = (req, res) => {
  try {
    const { id, newImage } = req.body;
    if (!id)
      return res.json({
        status: false,
        msg: "ກະລຸນາເລືອກລາຍການທີ່ຕ້ອງການປ່ຽນຮູບ",
      });
    if (!newImage)
      return res.json({ status: false, msg: "ກະລຸນາໃສ່ຮູບໃໝ່ທິ່ຕ້ອງການປ່ຽນ" });
    const con = getConnection();
    con.query(GETIMAGEURLSERVICE, [id], async (err, result) => {
      if (err) throw err;
      if (result === undefined || result.length <= 0) {
        return res.json({ status: false, msg: "ບໍ່ມີຂໍ້ມູນທີ່ຕ້ອງການແກ້ໄຂ" });
      }

      const ImURL = result[0].image;

      const NewImageLink = await UploadImagee(newImage);

      con.query(UPDATEIMAGESERVICE, [id, NewImageLink], (err, result) => {
        if (err) throw err;
        return res.json({ status: true, msg: "ການປ່ຽນແປງສຳເຫຼັດ" });
      });
    });
  } catch (error) {
    return console.log(error);
  }
};
