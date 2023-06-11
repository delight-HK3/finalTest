#!/usr/bin/env node
const readline = require('readline');

const readli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.clear();

const answerCall = (answer) => { 
    if(answer === 'y') {
        console.log('input y : ');
        readli.close(); // 프로그램 종료
    }
    else if(answer === 'n') {
        console.log('input n : ');
        readli.close(); // 프로그램 종료
    }
    else {
        console.clear(); // 콘솔 화면 초기화 
        console.log('y or n input');
        // 잘못 입력하면 다시 함수 실행
        readli.question('input (y/n) : ', answerCall) 
    }
};

// 최초 실행
readli.question('please input (y/n) : ', answerCall);