export const CREATETABLE_NABBER = `CREATE TABLE banner (
    id int PRIMARY KEY AUTO_INCREMENT,
    title varchar(150) not null,
    detail text,
    image varchar(255),
    isActive boolean DEFAULT true,
    createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp DEFAULT CURRENT_TIMESTAMP,
    deleteAt varchar(50) not null DEFAULT 'NO'
)ENGINE=INNODB DEFAULT charset=utf8`;

export const ADDBANNER = `INSERT INTO banner(title,detail,image) VALUES ?`;
export const DELETEBANNER = `UPDATE  banner SET deleteAt =CURRENT_TIMESTAMP where id =?`;
export const GETBANNER = `SELECT * FROM banner WHERE isActive = true AND deleteAt = 'NO'`;
export const UPDATETITLEBANNER = `UPDATE banner SET title=?,updatedAt=CURRENT_TIMESTAMP WHERE id=? AND deleteAt='NO'`;
export const UPDATEDETAILBANNER = `UPDATE banner SET detail=?,updatedAt=CURRENT_TIMESTAMP WHERE id=? AND deleteAt = 'NO'`;
export const DISNABLEBANNER = `UPDATE banner SET isActive=false,updatedAt=CURRENT_TIMESTAMP WHERE id=? AND deleteAt='NO'`;
export const UNDISNABLEBANNER = `UPDATE banner SET isActive=true,updatedAt=CURRENT_TIMESTAMP WHERE id=? AND deleteAt='NO'`;
export const GETIMAGEURL = `SELECT image FROM banner WHERE id=? AND deleteAt='NO'`;