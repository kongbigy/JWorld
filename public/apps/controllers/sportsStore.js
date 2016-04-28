/// <reference path="../angular.js" />

// angular.module("sportsStore")
// .controller("sportsStoreCtrl", function ($scope) {

//     $scope.data = {
//         products: [
//             {
//                 name: "Product #1", description: "A product",
//                 category: "Category #1", price: 100
//             },
//             {
//                 name: "Product #2", description: "A product",
//                 category: "Category #1", price: 110
//             },
//             {
//                 name: "Product #3", description: "A product",
//                 category: "Category #2", price: 210
//             },
//             {
//                 name: "Product #4", description: "A product",
//                 category: "Category #3", price: 202
//             }]
//     };
// });
    
angular.module("sportsStore")
    .constant("dataUrl", "http://localhost:3000/products")
    .constant("orderUrl", "http://localhost:3000/orders")
.controller("sportsStoreCtrl", function ($scope, $http, $location, dataUrl, orderUrl, cart) {
        $scope.data = {};

        $http.get(dataUrl)
            .success(function (data) {
                $scope.data.products = data;
            })
            .error(function (error) {
                $scope.data.error = error;
            });    
            
        $scope.sendOrder = function (shippingDetails) {
            alert(shippingDetails.name);
            
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order)
                .success(function (data) {
                    alert("success id:"+data.id);
                    $scope.data.orderId = data.id;
                    cart.getProducts().length = 0;
                })
                .error(function (error) {
                    alert("error :"+error);
                    $scope.data.orderError = error;
                }).finally(function () {
                    alert("finally, location");
                    $location.path("/complete");
                });
        }            
});
