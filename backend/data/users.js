import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Barry Allen',
    email: 'barry@gmail.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Oliver Queen',
    email: 'oliver@gmail.com',
    password: bcrypt.hashSync('123456', 10)
  }
];

export default users;
