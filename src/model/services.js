export const CREATETABLESERVICE = `CREATE TABLE services (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(150) not null,
    detail text,
    image varchar(150) not null,
    isActive boolean DEFAULT true,
    createdAt  timestamp DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp DEFAULT CURRENT_TIMESTAMP,
    deleteAt varchar(50) not null DEFAULT 'NO'
)ENGINE=INNODB DEFAULT charset=utf8`;

export const ADDSERVICE = `INSERT INTO services (name,detail,image) VALUES ?`;
export const DELETESERVICE = `UPDATE services SET deleteAt = CURRENT_TIMESTAMP WHERE id=? AND deleteAt ='NO'`;
export const GETSERVICE = `SELECT * FROM services WHERE isActive = true AND deleteAt = 'NO'`;
export const UPDATENAMESERVICE = `UPDATE services SET name=?,updatedAt=CURRENT_TIMESTAMP WHERE id=? AND deleteAt='NO'`;
export const UPDATEDETAILSERVICE = `UPDATE services SET detail=?,updatedAt=CURRENT_TIMESTAMP WHERE id=? AND deleteAt='NO'`;
export const DISNABLESERVICE = `UPDATE services SET isActive=false,updatedAt=CURRENT_TIMESTAMP WHERE id=? AND deleteAt='NO'`;
export const UNDISNABLESERVICE = `UPDATE services SET isActive=true,updatedAt=CURRENT_TIMESTAMP WHERE id=? AND deleteAt='NO'`;