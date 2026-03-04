module.exports = {
  HOST: "localhost",  // Changed from "localhost"
  USER: "myuser",
  PASSWORD: "1984",
  DB: "mydatabase",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};