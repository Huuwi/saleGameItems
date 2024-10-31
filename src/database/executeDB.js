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

    //  ALTER TABLE itemSalling
    //     ADD CONSTRAINT fk_item
    //     FOREIGN KEY (itemId) REFERENCES item(itemId)
    //     ON DELETE CASCADE;


    //                         `).then(data => console.log(data)).catch((e) => { console.log(e) })

    // await connection.disconnect()




    // let data = fs.readFileSync("../../newData.txt", "utf-8")

    // data = JSON.parse(data)

    // for (e of data) {

    //     await connection.executeQuery("insert into item (image,itemType,description,gameId , name) values (? ,? ,? ,? ,?)", [e.img, Math.floor(Math.random() * 2) + 1, e.descriptions, 1 + Math.floor(Math.random() * 9), e.name])
    //         .then((e) => {
    //         })
    //         .catch((e) => {
    //             console.log(e);

    //         })

    // }



    // await connection.executeQuery("update gameAccount set userId = 4 where userNameGame = 'gameAccount3' ")
    //     .then((e) => {
    //         console.log(e);
    //     })

    // await connection.executeQuery("update user set gameId = 5 where userName = '20226037371' ")
    //     .then((e) => {
    //         console.log(e);
    //     })

    // await connection.executeQuery("update gameAccount set userId = 5 where userNameGame = 'gameAccount4' ")
    //     .then((e) => {
    //         console.log(e);
    //     })

    // await connection.executeQuery("update item set gameId = ?", [2 + Math.floor(Math.random() * 4)])
    //     .then((e) => {
    //         console.log(e);
    //     })

    // for (let i = 2; i < 107; i++) {
    //     if (i % 6 == 0) {
    //         await connection.executeQuery("update item set gameId = ? where itemId = ?", [6, i])
    //             .then((e) => {
    //                 console.log(e);
    //             })
    //     }

    // }



    // await connection.executeQuery("select gameId , itemId , name from item")
    //     .then((e) => {
    //         console.log(e);
    //     })

    // await connection.executeQuery("select item.itemId , name , price from itemSalling inner join item on item.itemId = itemSalling.itemId order by item.itemId ")
    //     .then((e) => {
    //         console.log(e);
    //     })

    // await connection.executeQuery("select itemId , name , gameId from item order by itemId ")
    //     .then((e) => {
    //         console.log(e);
    //     })

    await connection.executeQuery(`
       SELECT 
            i.name,
            i.description,
            i.image,
            i.itemType,
            its.price,
            u.nickName,
            u.avartar,
            u.userId
            FROM user u
            JOIN gameAccount ga ON u.userId = ga.userId
            JOIN item i ON ga.gameId = i.gameId
            JOIN itemSalling its ON i.itemId = its.itemId;
        `)
        .then((e) => {
            fs.writeFileSync("../../test.json", JSON.stringify(e))
            console.log(e);
        })


    // await connection.executeQuery("select * from item")
    //     .then((e) => {
    //         console.log(e);
    //     })
    // await connection.executeQuery("select * from itemSalling")
    //     .then((e) => {
    //         console.log(e);
    //     })


    // for (let i = 0; i < 50; i++) {
    //     await connection.executeQuery("insert into itemSalling (itemId , price) values (?,?)", [i, Math.floor(Math.random() * 100) + 200 + Math.floor(Math.random() * 100)])
    // }












}

main()