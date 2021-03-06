const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../server/app.js');

const request = supertest(app);

/*
SOME JEST NOTES:

To remove console.logs: jest --silent

For pretty clgs:
const colors = require('colors');
process.stdout.write(colors.blue(message));

SUPERTEST NOTE: supertest(app) allows us to call RESTful methods on our API routes
so request.get('/') will return the HTML response to the request!

*/

// Runs ONCE before ANY tests in this file - NOT before EACH test!
beforeAll(async (done) => {
  // disconnect from the real database first!
  await mongoose.disconnect();

  mongoose.connect('mongodb://localhost/tourDbTest', { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', (err) => done.fail(err));
  db.once('open', () => done());
  done();
});

describe('Test root path', () => {
  it('should respond to GET method', async (done) => {
    const response = await request.get('/');
    expect(response.statusCode).toBe(200);
    done();
  });
});

// Runs after all tests in this file have finished!
afterAll(async (done) => {
  await mongoose.disconnect();
  done();
});
