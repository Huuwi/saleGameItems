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

    // await connection.executeQuery('insert into user (username, password, balance, isRegSale, idGame, timeCreate, isAdmin) values (?, ?, ?, ?, ?, ?, ?)', ['Dung', 'dung123', 10, 1, 'game1', 23, 1]).catch((err) => {console.log(err);})

    await connection.executeQuery('SELECT * FROM user').then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    });
}

main()