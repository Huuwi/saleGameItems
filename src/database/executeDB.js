const { Connection } = require("../database/connection.js")
const dotenv = require("dotenv").config({ path: "../../.env" })

console.log(process.env.DATABASE_NAME);


const main = async () => {
    let connection = new Connection()
    await connection.connect()

    // await connection.executeQuery(`CREATE TABLE table_name (
    // userId int not null AUTO_INCREMENT primary key ,
    // username varchar(20) not null ,
    // password varchar(20) not null,
    // balance double default 0 ,
    // isRegSale boolean default 0,
    // idGame varchar(20) ,
    // timeCreate int,
    // isAdmin boolean default 0
    // );`)

    // await connection.executeQuery(`
    //     insert into table user
    //     `)

}

main()