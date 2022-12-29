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
export const GETBANNER = ``;