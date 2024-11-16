import request from 'supertest';
import { expect } from 'chai';
import { httpServer, initializeApp } from './src/server.js';

describe('AuthController - Login', () => {


    before(async () => {
        await initializeApp()
    });

    it('should return 200 if get new captcha success', async () => {
        const res = await request(httpServer)
            .post('/api/getNewCaptcha')
            .send({});

        // console.log(res.body);

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('ok!');
    });


    it('should return 400 if missing data', async () => {
        const res = await request(httpServer)
            .post('/api/login')
            .send({
                text: "123",
                userName: "2312",
                passWord: "123132",
            });

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('missing data!');
    });

    it('should return 400 if not found captcha data', async () => {
        const res = await request(httpServer)
            .post('/api/login')
            .send({
                text: 'invalidCaptchaText',
                userName: 'testuser',
                passWord: 'password123',
                key: '7g1ub287tbasd7y21',
            });


        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('not found captcha data!');
    });




    it('should return 400 if captcha already use!', async () => {
        const res = await request(httpServer)
            .post('/api/login')
            .send({
                text: 'E4Wbn',
                userName: 'testuser',
                passWord: 'password123',
                key: '30e8ba83efd0bf58643cadb6fe25fd42',
            });

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('captcha already use!');
    });



    it('should return 400 if captcha expired time!', async () => {
        const res = await request(httpServer)
            .post('/api/login')
            .send({
                text: 'E4Wbn',
                userName: 'testuser',
                passWord: 'password123',
                key: 'af9b71ae0e9149115dce78e25d72a742',
            });

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('captcha expired time!');
    });



    it('should return 400 if captcha invalid!', async () => {
        const res = await request(httpServer)
            .post('/api/login')
            .send({
                text: '12380sad',
                userName: 'testuser',
                passWord: 'password123',
                key: 'cb5a3d7736c102a417e91c5bc627b692',
            });

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('captcha invalid!');
    });





    it('should return 400 if username contains invalid characters', async () => {
        const res = await request(httpServer)
            .post('/api/login')
            .send({
                text: '123sa',
                userName: 'tes`tuser',
                passWord: 'password123',
                key: '91c5bc627b692cb5a3d7736c102a417e',
            });
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('can\'t include characters :  ` ," ,\'');
    });




    it('should return 400 if user not found', async () => {
        const res = await request(httpServer)
            .post('/api/login')
            .send({
                text: '123sa',
                userName: 'test123asd2',
                passWord: 'password123',
                key: '1235bc627b692cb5a3d7736c102a417e',
            });

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('not found user!');
    });



    it('should return 400 if password is incorrect', async () => {
        const res = await request(httpServer)
            .post('/api/login')
            .send({
                text: '123sa',
                userName: 'test123',
                passWord: '234s',
                key: '6875bc627b692cb5a3d7736c102a417e',
            });

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('password is not correct!');
    });





    it('should return 200 and valid tokens if login is successful', async () => {
        const res = await request(httpServer)
            .post('/api/login')
            .send({
                text: '123sa',
                userName: 'test123',
                passWord: 'test123',
                key: '5123bc627b692cb5a3d7736c102a417e',
            });

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('ok');
        expect(res.body).to.have.property('userData');
        expect(res.body).to.have.property('at');
        expect(res.body).to.have.property('userData').that.is.an('object');
        expect(res.body.userData).to.have.property('userId');
    });
});
