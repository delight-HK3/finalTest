module.exports = app =>{
    const customers = require("../controllers/customer.controller.js");
    
    // 테이블 튜플 생성
    app.post("/customers", customers.create);

    // 테이블 전체 조회 
    app.get("/customers", customers.findAll);

    // 테이블 id로 조회
    app.get("/customers/:customerId", customers.findOne);

    // 테이블 id로 수정
    app.put("/customers/:customerId", customers.update);

    // 테이블 id로 삭제
    app.delete("/customers/:customerId", customers.delete);

    // 테이블 전체 삭제
    app.delete("/customers", customers.deleteAll);

};