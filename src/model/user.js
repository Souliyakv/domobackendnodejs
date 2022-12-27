export const CREATEDATABASE_USER = `CREATE TABLE users (
    USER_ID int PRIMARY KEY AUTO_INCREMENT,
    fname varchar(50) not null,
    lname varchar(50) not null,
    phone varchar(13) not null UNIQUE KEY,
    password varchar(200) not null,
    profile varchar(255)
)ENGINE=INNODB DEFAULT charset=utf8`;

export const CHECKPHONE = `SELECT * from users WHERE phone=?`;
export const REGISTER = `INSERT INTO users (fname,lname,phone,password,profile) VALUES ?`;
export const GETALLUSERS = `SELECT * from users`;
export const CHECKUSER = `SELECT * from users WHERE USER_ID=?`