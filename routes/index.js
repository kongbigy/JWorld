var express = require('express');
var router = express.Router();

  
var products = [
  {
      name: "Product #1", description: "A product",      category: "Category #1", price: 100, id: "0"
  },
  {
      name: "Product #2", description: "A product",      category: "Category #1", price: 110, id: "1"
  },
  {
      name: "Product #3", description: "A product",      category: "Category #2", price: 210, id: "2"
  },
  {
      name: "Product #4", description: "A product",      category: "Category #3", price: 202, id: "3"
  }
];

var orders = [
  {
    "name":"박형진", "street":"서울 구로구 구로동", "city":"서울", "state":"미주리주", 
    "zip":"02523", "country":"코리아", "giftwrap":true, "products":  [{
                                                                        name: "Product #2", description: "A product",
                                                                        category: "Category #1", price: 110, id: "1", count: 2
                                                                    }]
  }
];


// 상점 목록 요구
router.get('/products', function(req, res, next) {
  //render('index', { title: 'jiny\'world' }

  res.send(JSON.stringify(products));
});

// 주문 목록 요구 
router.get('/orders', function(req, res, next) {
  
  res.send(JSON.stringify(orders));
  
});

// 주문 전송 
router.post('/orders', function(req, res, next) {

  var name = req.body.name;
  var street = req.body.street;   
  var city = req.body.city;   
  var state = req.body.state;   
  var zip = req.body.zip;   
  var country = req.body.country;   
  var giftwrap = req.body.giftwrap;   
  var products = req.body.products;   
  
  console.log("products:", products.join());
  
  var order_id = orders.length + 1;
  
  var order = {"name":name, "street":street, "city":city, "state":state, "zip":zip, "country":country, "giftwrap":giftwrap, "products":products};
 
  console.log("order:",order);   
  
  orders.push(order);
  
  //console.log("orders:",orders.join());  

  res.send({id:order_id});
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'jiny\'world' });
});

module.exports = router;
