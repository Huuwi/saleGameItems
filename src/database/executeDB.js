const { Connection } = require("../database/connection.js")
const dotenv = require("dotenv").config({ path: "../../.env" })

console.log(process.env.DATABASE_NAME);


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
    //     image varchar(255) default 'https://th.bing.com/th/id/OIP.4u4taK5oLHElvRz5jz7YjAAAAA?rs=1&pid=ImgDetMain',
    //     itemType int
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

    // await connection.executeQuery(`ALTER TABLE follow ADD CONSTRAINT fk_userIdFollower FOREIGN KEY (userIdFollower) REFERENCES user(userId) ON DELETE CASCADE, ADD CONSTRAINT fk_userIdFollowed FOREIGN KEY (userIdFollowed) REFERENCES user(userId) ON DELETE CASCADE;`)
    // await connection.executeQuery(`ALTER TABLE transaction ADD CONSTRAINT fk_transaction_userId FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE;`)
    //     await connection.executeQuery(`ALTER TABLE message ADD CONSTRAINT fk_message_senderId FOREIGN KEY (senderId) REFERENCES user(userId) ON DELETE CASCADE, ADD CONSTRAINT fk_message_recipientId FOREIGN KEY (recipientId) REFERENCES user(userId) ON DELETE CASCADE;
    // `)
    //     await connection.executeQuery(`ALTER TABLE sale ADD CONSTRAINT fk_sale_sellerId FOREIGN KEY (sellerId) REFERENCES user(userId) ON DELETE CASCADE, ADD CONSTRAINT fk_sale_buyerId FOREIGN KEY (buyerId) REFERENCES user(userId) ON DELETE CASCADE, ADD CONSTRAINT fk_sale_itemId FOREIGN KEY (itemId) REFERENCES item(itemId) ON DELETE CASCADE;
    // `)
    //     await connection.executeQuery(`ALTER TABLE item ADD CONSTRAINT fk_item_gameId FOREIGN KEY (gameId) REFERENCES gameAccount(gameId) ON DELETE CASCADE;
    // `)
    //     await connection.executeQuery(`ALTER TABLE itemSaling ADD CONSTRAINT fk_itemSaling_idItem FOREIGN KEY (idItem) REFERENCES item(itemId) ON DELETE CASCADE;
    // `)

    //     await connection.executeQuery(`ALTER TABLE item
    // ADD CONSTRAINT fk_item_itemSaling
    // FOREIGN KEY (itemId) REFERENCES itemSaling(idItem)
    // ON DELETE CASCADE;
    // `).then(data => console.log(data)
    //     )

    //     await connection.executeQuery(`SELECT 
    //     CONSTRAINT_NAME,
    //     TABLE_NAME,
    //     COLUMN_NAME,
    //     REFERENCED_TABLE_NAME,
    //     REFERENCED_COLUMN_NAME
    // FROM 
    //     information_schema.KEY_COLUMN_USAGE
    // WHERE 
    //     TABLE_SCHEMA = 'defaultdb' 
    //     AND TABLE_NAME = 'item' 
    //     AND REFERENCED_TABLE_NAME = 'itemSaling';
    // `).then(data => console.log(data)
    // )


    await connection.executeQuery(`

            select*from item


                    `).then(data => console.log(data)
    )












}

main()