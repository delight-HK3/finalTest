const Customer = require("../models/customer.model.js");

// customer 테이블 새 객체 생성
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "내용이 비어있습니다."
        });
    };

    const customer = new Customer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    });

    // 데이터베이스에 저장
    Customer.create(customer, (err, data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Customer를 생성하는 동안 일부 오류가 발생했습니다."
            });
        };
    })
};

// customer 테이블 전체 조회 
exports.findAll = (req,res)=>{
    Customer.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Customer를 생성하는 동안 일부 오류가 발생했습니다."
          });
        else
            return res.send(data);
      });
};

// customer 테이블 id로 조회
exports.findOne = (req,res)=>{
    Customer.findById(req.params.customerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: '아이디를 찾을 수 없습니다. ${req.params.customerId}.'
            });
          } else {
            res.status(500).send({
              message: "아이디를 검색하는중 에러가 발생했습니다. " + req.params.customerId
            });
          }
        } else res.send(data);
      });
};

// customer 테이블 id로 갱신
exports.update = (req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "내용이 비어있습니다."
    });
  }

  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: '아이디를 찾을 수 없습니다. ${req.params.customerId}.'
          });
        } else {
          res.status(500).send({
            message: "아이디를 검색하는중 에러가 발생했습니다. " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};

// customer 테이블 id로 삭제
exports.delete = (req,res)=>{
    Customer.remove(req.params.customerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: '아이디를 찾을 수 없습니다. ${req.params.customerId}'
            });
          } else {
            res.status(500).send({
              message: "삭제할 수 없는 아이디 입니다. " + req.params.customerId
            });
          }
        } else res.send({ message: `deleted successfully!` });
      });
};

// customer 테이블 전체 삭제
exports.deleteAll = (req,res)=>{
    Customer.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });
};
 
