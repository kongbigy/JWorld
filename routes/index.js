var express = require('express');
var router = express.Router();

  
var products = [
  {
      name: "Product #1", description: "A product",      
      category: "Category #1", price: 100, id: "1"
  },
  {
      name: "Product #2", description: "A product",      
      category: "Category #1", price: 110, id: "2"
  },
  {
      name: "Product #3", description: "A product",      
      category: "Category #2", price: 210, id: "3"
  },
  {
      name: "Product #4", description: "A product",      
      category: "Category #3", price: 202, id: "4"
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

// 상품 삭제
router.delete('/products/:id', function(req, res, next) {

  var id = req.params.id;
 
  for( var i = 0; i < products.length; i++)
  {
    if( products[i].id == id ){
      products.splice(products.indexOf(products[i]), 1);
      break;
    }
  }
     
  res.send("success");
});

// 상품 수정
router.post('/products/:id', function(req, res, next) {

  var name = req.body.name;
  var description = req.body.description;   
  var category = req.body.category;   
  var price = req.body.price;   
  
  var id = req.params["id"];
  var id2 = req.params.id;
 
  var product = null;
  for( var i = 0; i < products.length; i++)
  {
    if( products[i].id == id ){
      products[i].name = name;
      products[i].description = description;
      products[i].category = category;
      products[i].price = price;
      
      product = products[i];
      break;
    }
  }
     
  res.send(product);
});

// 상품 등록
router.post('/products', function(req, res, next) {

  var name = req.body.name;
  var description = req.body.description;   
  var category = req.body.category;   
  var price = req.body.price;   
  
  var max_id = -1;
  for( var i = 0; i < products.length; i++)
  {
    if( products[i].id > max_id  ){
      max_id = products[i].id;
    }
  }
    
  max_id++;
  var id = max_id.toString();
 
  var product = {"name":name, "description":description, "category":category, "price":price, "id":id};
 
  console.log("product:",product);   
  
  products.push(product);
     
  res.send(product);
});

// 상품 목록 요구
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
