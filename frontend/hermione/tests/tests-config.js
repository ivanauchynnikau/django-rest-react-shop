module.exports = {
  host: 'http://localhost:8080',
  delays: {
    pageLoad: 10000,
    visible: 1200
  },
  users: {
    password: 'example123',
    email: () => {
      const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
      let string = '';

      for (let i = 0; i < 5; i++) {
        string += chars[Math.floor(Math.random() * chars.length)];
      }

      return `${string}@example.com`;
    },
  }
};
