const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


describe('oauth routes', () => {
    beforeEach(() => {
      return setup(pool);
    });
    it('Creates a Post', () => {
      expect().toEqual();
    });
    afterAll(() => {
      pool.end();
    });