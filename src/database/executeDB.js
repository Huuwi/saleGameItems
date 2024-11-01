const { Connection } = require("../database/connection.js")
require("dotenv").config({ path: "../../.env" })

const fs = require("fs")

const main = async () => {
    let connection = new Connection()
    await connection.connect()

    // await connection.executeQuery(`CREATE TABLE user (
    // userId int primary key NOT NULL AUTO_INCREMENT,
    // userName varchar(30) not null,
    // passWord varchar(100) not null ,
    // nickName varchar(30) CHARACTER SET utf8mb4,
    // avartar varchar(255) default 'https://i.pinimg.com/736x/97/b6/2f/97b62faf1b0981474fea80d14a6bdcad.jpg',
    // gameId int default -1,
    // isRegSale boolean default 0,
    // isAdmin boolean default 0,
    // balance double default 0 
    // );`)


    //     await connection.executeQuery(`CREATE TABLE gameAccount (
    //     gameId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    //     userNameGame VARCHAR(30) NOT NULL,
    //     passWordGame VARCHAR(30) NOT NULL,
    //     userId INT,
    //     CONSTRAINT FK_User_GameAccount FOREIGN KEY (userId) 
    //     REFERENCES user(userId) 
    //     ON DELETE SET NULL 
    //     ON UPDATE CASCADE
    // );`)


    // await connection.executeQuery(`CREATE TABLE item (
    //     itemId int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    //     image varchar(255) DEFAULT 'https://th.bing.com/th/id/OIP.4u4taK5oLHElvRz5jz7YjAAAAA?rs=1&pid=ImgDetMain',
    //     itemType int DEFAULT 1,
    //      name text CHARACTER SET utf8mb4,
    //     description text CHARACTER SET utf8mb4,
    //     gameId int 
    // );`);


    // await connection.executeQuery(`CREATE TABLE itemSalling (
    //     itemSallingId int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    //     itemId int,
    //     price double
    // );`);


    // await connection.executeQuery(`
    //         create table saleHistory (
    //             idSaleHistory int primary key NOT NULL AUTO_INCREMENT,
    //             userIdSaler  int,
    //             userIdBuyer int,
    //             itemId int,
    //             price double            
    //         );
    //     `)




    //----------------------------------------------------------------------------------------------------------------------------------


    // await connection.executeQuery("select * from itemSalling")
    //     .then((e) => {
    //         console.log(e);
    //     })




    await connection.disconnect()








}

main()