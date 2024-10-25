const request = require('supertest');
const express = require('express');
const session = require('express-session');

// Import your router (change this to the actual path of your router)
const authRouter = require('../routes/auth'); 

// Create an express app instance and use the router
const app = express();
app.use(express.json());
app.use(
  session({
    secret: 'testsecret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use('/api/auth', authRouter);

// Mock the Sequelize models inside jest.mock()
jest.mock('../models', () => {
  // Move bcrypt inside the mock factory
  const bcrypt = require('bcryptjs');
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  // create the mock data inside the jest mock
  const mockUser = dbMock.define('user', {
    username: 'JaneDoe',
    email: 'janeDoe@gmail.com',
    password: bcrypt.hashSync('password', 10), // Hash the password here
  });

  const mockRestaurant = dbMock.define('restaurant', {
    restaurantName: 'Mock Restaurant',
  });

  return {
    User: mockUser,
    Restaurant: mockRestaurant,
  };
});

// Test for the signup route
describe('POST /api/auth/signup', () => {
  it('should create a new user and return 201', async () => {
    const { User } = require('../models');
    // Mock the create method to resolve successfully
    User.create = jest.fn().mockResolvedValue({
      username: 'JaneDoe',
      email: 'janeDoe@gmail.com',
    });

    const response = await request(app).post('/api/auth/signup').send({
      username: 'JaneDoe',
      email: 'janeDoe@gmail.com',
      password: 'password',
    });

    expect(User.create).toHaveBeenCalled(); // Verify create method was called
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('The user is created!');
    expect(response.body.user).toEqual({
      username: 'JaneDoe',
      email: 'janeDoe@gmail.com',
    });
  });

  it('should return 422 for a non-unique username', async () => {
    const { User } = require('../models');
    // Mock the create method to reject due to unique constraint error
    User.create = jest.fn().mockRejectedValue({
      name: 'SequelizeUniqueConstraintError',
    });

    const response = await request(app).post('/api/auth/signup').send({
      username: 'JaneDoe',
      email: 'janeDoe@gmail.com',
      password: 'password',
    });

    expect(User.create).toHaveBeenCalled(); // Verify create method was called
    expect(response.statusCode).toBe(422);
    expect(response.body.errors).toBe(
      'this username is being used by another user'
    );
  });
});

// Test for the login route
describe('POST /api/auth/login', () => {
  const bcrypt = require('bcryptjs');
  it('should log in a user with correct credentials', async () => {
    const { User } = require('../models');
    // Mock the findOne method to return a user
    User.findOne = jest.fn().mockResolvedValue({
      id: 1,
      username: 'JaneDoe',
      email: 'janeDoe@gmail.com',
      password: bcrypt.hashSync('password', 10),
      hasRestaurant: false,
      Restaurants: [],
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'janeDoe@gmail.com',
      password: 'password',
    });

    expect(User.findOne).toHaveBeenCalled(); // Verify findOne method was called
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Logged in successfully');
    expect(response.body.user).toEqual({
      id: 1,
      username: 'JaneDoe',
      email: 'janeDoe@gmail.com',
      hasRestaurant: false,
      profileImage: undefined,
      restaurants: [],
    });
  });

  // test for when wrong credential being used
  it('should return 401 for invalid credentials', async () => {
    const { User } = require('../models');
    // Mock the findOne method to return null (user not found)
    User.findOne = jest.fn().mockResolvedValue(null);

    const response = await request(app).post('/api/auth/login').send({
      email: 'invalid@gmail.com',
      password: 'password',
    });

    expect(User.findOne).toHaveBeenCalled(); // Verify findOne method was called
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid email or password');
  });
});
