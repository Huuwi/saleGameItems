const { Connection } = require("../database/connection.js")
const dotenv = require("dotenv").config({ path: "../../.env" })

console.log(process.env.DATABASE_NAME);


const main = async () => {
    let connection = new Connection()
    await connection.connect()

    // await connection.executeQuery(`CREATE TABLE user (
    //     userId int primary key NOT NULL AUTO_INCREMENT,
    //     userName varchar(30) not null,
    //     passWord varchar(100) not null ,
    //     nickName varchar(30) CHARACTER SET utf8mb4,
    //     avartar varchar(255) default 'https://i.pinimg.com/736x/97/b6/2f/97b62faf1b0981474fea80d14a6bdcad.jpg',
    //     gameId int default -1,
    //     isRegSale boolean default 0,
    //     isAdmin boolean default 0,
    //     balance double default 0 
    // );`)


    // await connection.executeQuery(`CREATE TABLE follow (
    //     followId int primary key not null auto_increment,
    //     userIdFollower int,
    //     userIdFollowed int
    // );`)

    // await connection.executeQuery(`CREATE TABLE transaction (
    //     transactionId int primary key not null auto_increment,
    //     userId int,
    //     amount double,
    //     time double
    // );`)

    // await connection.executeQuery(`CREATE TABLE message (
    //     messageId int primary key not null auto_increment,
    //     senderId int,
    //     recipientId int,
    //     content text CHARACTER SET utf8mb4
    // );`)


    // await connection.executeQuery(`CREATE TABLE sale (
    //     saleId int primary key not null auto_increment,
    //     sellerId int,
    //     buyerId int,
    //     itemId int,
    //     price double
    // );`)

    // await connection.executeQuery(`CREATE TABLE item (
    //     itemId int primary key not null auto_increment,
    //     gameId int,
    //     image varchar(255) default 'https://th.bing.com/th/id/OIP.4u4taK5oLHElvRz5jz7YjAAAAA?rs=1&pid=ImgDetMain'
    // );`)

    // await connection.executeQuery(`CREATE TABLE gameAccount (
    //     gameId int primary key not null auto_increment,
    //     userNameGame varchar(30) not null,
    //     passWordGame varchar(30) not null ,
    //     isLink boolean default 0

    // );`)

    // await connection.executeQuery(`CREATE TABLE itemSaling (
    //     itemSalingId int primary key not null auto_increment,
    //     idItem int,
    //     price double
    // );`)

    await connection.executeQuery
}

main()