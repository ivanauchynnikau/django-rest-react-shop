module.exports = {
  host: 'http://localhost:8080',
  delays: {
    pageLoad: 10000,
    visible: 1200
  },
  users: {
    email: `example${(Math.random()*10000).toString().slice(0,4)}@example.com`,
    password: 'example123'
  }
};
