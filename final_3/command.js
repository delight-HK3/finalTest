#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const htmlTemplate = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello</h1>
    <p>Node JS CLI</p>
</body>
</html>
`;

const routerTemplate = `
const express = require('express');
const router = express.Router();
 
router.get('/', (req, res, next) => {
   try {
     res.send('ok');
   } catch (error) {
     console.error(error);
     next(error);
   }
});
 
module.exports = router;
`;

const localDBconnection = `
const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://root:comtrue@localhost:27017/admin';

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
`;

const exist = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const mkdirp = (dir) => {
  const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep)
    .filter(p => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

const makeTemplate = (type, name, directory) => {
  mkdirp(directory);
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);
    if (exist(pathToFile)) {
      console.error('이미 해당 파일이 존재합니다');
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(pathToFile, '생성 완료');
    }
  } 
  else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error('이미 해당 파일이 존재합니다');
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(pathToFile, '생성 완료');
    }
  } 
  else if(type === 'localDBconnection'){
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error('이미 해당 파일이 존재합니다');
    } else {
      fs.writeFileSync(pathToFile, localDBconnection);
      console.log(pathToFile, '생성 완료');
    }
  }
  else {
    console.error('html 또는 express-router, localDBconnection 셋 중 하나를 입력하세요.');
  }
};

program
  .version('0.0.1', '-v, --version')
  .name('cli');

program
  .command('template <type>')
  .usage('<type> --filename [filename] --path [path]')
  .description('템플릿을 생성합니다.')
  .alias('tmpl')
  .option('-f, --filename [filename]', '파일명을 입력하세요.', 'index')
  .option('-d, --directory [path]', '생성 경로를 입력하세요', '.')
  .action((type, options, command) => {
    makeTemplate(type, options.filename, options.directory);
  });

program
  .action((options, command) => {
    if (command.args.length !== 0) {
      console.log('해당 명령어를 찾을 수 없습니다.');
      program.help();
    } else {
      inquirer.prompt([{
        type: 'list',
        name: 'type',
        message: '템플릿 종류를 선택하세요.',
        choices: ['html', 'express-router', 'localDBconnection'],
      }, {
        type: 'input',
        name: 'name',
        message: '파일의 이름을 입력하세요.',
        default: 'index',
      }, {
        type: 'input',
        name: 'directory',
        message: '파일이 위치할 폴더의 경로를 입력하세요.',
        default: '.',
      }, {
        type: 'confirm',
        name: 'confirm',
        message: '생성하시겠습니까?',
      }])
        .then((answers) => {
          if (answers.confirm) {
            makeTemplate(answers.type, answers.name, answers.directory);
            console.log('터미널을 종료합니다.');
          }
        });
    }
  })
  .parse(process.argv);
