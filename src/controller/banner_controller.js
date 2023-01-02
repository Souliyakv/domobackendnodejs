import { DeleteImage, UploadImagee } from "../config/cloudinary.js";
import { getConnection } from "../config/db.js";
import {
  ADDBANNER,
  DELETEBANNER,
  DISNABLEBANNER,
  GETBANNER,
  GETIMAGEURL,
  UNDISNABLEBANNER,
  UPDATEDETAILBANNER,
  UPDATETITLEBANNER,
} from "../model/banner.js";

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

export const SelectBannerController = (req, res) => {
  try {
    const con = getConnection();
    con.query(GETBANNER, (err, result) => {
      if (err) throw err;
      return res.json({ type: "success", list: result });
    });
  } catch (error) {
    return console.log(error);
  }
};

export const UpdateTitleBannerController = (req, res) => {
  try {
    const { id, newTitle } = req.body;
    if (!id) return res.json({ msg: "ກະລຸນາເລືອກລາຍການທີ່ຕ້ອງການແກ້ໄຂ" });
    if (!newTitle) return res.json({ msg: "ກະລຸນາໃສ່ຫົວຂໍ້ໃໝ່" });
    const con = getConnection();
    con.query(UPDATETITLEBANNER, [newTitle, id], (err, result) => {
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

export const UpdateDetailBannerController = (req, res) => {
  try {
    const { id, newdetail } = req.body;
    if (!id) return res.json({ msg: "ກະລຸນາເລືອກລາຍການທີ່ຈະແກ້ໄຂ" });
    if (!newdetail) return res.json({ msg: "ກະລຸນາໃສ່ລາຍລະອຽດໃໝ່" });
    const con = getConnection();
    con.query(UPDATEDETAILBANNER, [newdetail, id], (err, result) => {
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


export const DisnableBannerController = (req,res)=>{
  try {
    const id = req.body.id;
   
    if(!id) return res.json({msg:"ກະລຸນາເລືອກລາຍການທີ່ຕ້ອງການຍົກເລີກຊົ່ວຄາວ"});
    const con = getConnection();
    con.query(DISNABLEBANNER,[id],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows ==1){
        return res.json({type:"success",msg:"ຍົກເລີກສຳເຫຼັດ"});
      }return res.json({
        type: "err",
        msg: "ບໍ່ສາມາດຍົກເລີກໄດ້ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ",
      });
    })
  } catch (error) {
    return console.log(error);
  }
}

export const UnDisnableBannerController =(req,res)=>{
  try {
    const id = req.body.id;
    console.log(id);
    if(!id) return  res.json({msg:"ກະລຸນາເລືອກລາຍການທີ່ຕ້ອງການເປີດໃຊ້ງານ"});
    
    const con = getConnection();
    
    con.query(UNDISNABLEBANNER,[id],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows ==1){
        return res.json({type:"success",msg:"ເປີດໃຊ້ງານສຳເຫຼັດ"});
      }
      return res.json({
        type: "err",
        msg: "ບໍ່ສາມາດເປີດໃຊ້ງານໄດ້ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ",
      });
    })
  } catch (error) {
    return console.log(error);
  }

}

export const ChangeImageBannerController = (req,res)=>{
  try {
    const {id,newImage} = req.body;
    if(!id) return res.json({msg:"ກະລຸນາເລືອກລາຍການທີ່ຕ້ອງການປ່ຽນຮູບ"});
    if(!newImage) return res.json({msg:"ກະລຸນາໃສ່ຮູບໃໝ່ທິ່ຕ້ອງການປ່ຽນ"});
    const con = getConnection();
    con.query(GETIMAGEURL,[id],async(err,result)=>{
      if(err) throw err;
      if(result === undefined || result.length <=0){
        return res.json({type:"err",msg:"ບໍ່ມີຂໍ້ມູນທີ່ຕ້ອງການແກ້ໄຂ"});
      }
      const ImURL = result[0];
      const Imdelete = await DeleteImage(ImURL);
      console.log(Imdelete);

    })

  } catch (error) {
    return console.log(error);
  }
}