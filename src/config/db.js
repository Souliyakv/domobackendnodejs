import mysql from "mysql";

export function getConnection(){
    const con = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'demo'
    })
    con.connect(function(err){
        if(err){
            console.log('err'+err);
        }
        console.log(`Mysql connected`);
    })
    return con;
}