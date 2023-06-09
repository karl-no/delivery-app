const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const userController = require('../../controller/user.controller');
const userService = require('../../service/user.service');

describe('Test the user controller', () => {
  describe('Test the Login router', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Test with not existed user', async function () {
      const res = {};
      const req = {
        body: {
          email: 'test@test.com',
          password: '123456',
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(userService, 'getUserByEmail')
      .resolves(null);

      await userController.login(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
    });

    it('Test with existed user', async function () {
      const res = {};
      const req = {
        body: {
          email: 'test@test.com',
          password: '123456789',
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(userService, 'getUserByEmail')
        .resolves({ password: '25f9e794323b453885f5181f1b624d0b' });

      await userController.login(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Test the Register router', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Test with already existed user', async function () {
      const res = {};
      const req = {
        body: {
          email: 'test@test.com',
          password: '123456',
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(userService, 'createUser')
      .resolves(null);

      await userController.createUser(req, res);

      expect(res.status.calledWith(409)).to.be.equal(true);
    });

    it('Test with valid credentials', async function () {
      const res = {};
      const req = {
        body: {
          email: 'test@test.com',
          password: '123456789',
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(userService, 'createUser')
        .resolves({ password: '25f9e794323b453885f5181f1b624d0b' });

      await userController.createUser(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });

    it('Test if the state of the request is 400', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(userService, 'getSellers')
        .throwsException()

      await userController.getSellers(req, res);
      expect(res.status.calledWith(400)).to.be.equal(true);
    });

    it('Test if the state of the request is 200', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(userService, 'getSellers')
        .resolves();

      await userController.getSellers(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});

