const { Connection } = require("../database/connection.js")
const dotenv = require("dotenv").config({ path: "../../.env" })

console.log(process.env.DATABASE_NAME);


const main = async () => {
    let connection = new Connection()
    await connection.connect()

    // await connection.executeQuery(`CREATE TABLE user (
    //     userId int primary key NOT NULL AUTO_INCREMENT,
    //     userName varchar(30) not null,
    //     passWord varchar(30) not null ,
    //     nickName varchar(30) CHARACTER SET utf8mb4,
    //     avartar varchar(255) default 'https://i.pinimg.com/736x/97/b6/2f/97b62faf1b0981474fea80d14a6bdcad.jpg',
    //     gameId int,
    //     isRegSale boolean default 0,
    //     isAdmin boolean default 0,
    //     balance double default 0 
    // );`)



    await connection.executeQuery(`CREATE TABLE follow (
        followId int primary key not null auto_increment,
        userIdFollower int,
        userIdFollowed int
    );`)




    await connection.executeQuery(`CREATE TABLE transaction (
        transactionId int primary key not null auto_increment,
        userId int,
        amount double,
        time double
    );`)





}

main()