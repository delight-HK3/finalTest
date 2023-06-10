const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

const connect = () => {
  if (NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  mongoose.connect(MONGO_URL, {
    dbName: 'webchat',
    useNewUrlParser: true,
  }).then(() => {
    console.log("MongoDB 연결 성공");
  }).catch((err) => {
    console.error("MongoDB 연결 에러", err);
  });
};

mongoose.connection.on('error', (error) => {
  console.error('MongoDB 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('MongoDB 연결 재시도');
  connect();
});

module.exports = connect;
