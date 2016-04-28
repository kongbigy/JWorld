angular.module("sportsStoreAdmin")
.constant("authUrl", "http://localhost:3000/users/login")
.constant("ordersUrl", "http://localhost:3000/orders")
.controller("authCtrl", function($scope, $http, $location, authUrl) {

    $scope.authenticate = function (user, pass) {
        
        $http.post(authUrl, {
            username: user,
            password: pass
        }, {
            withCredentials: true
        }).success(function (data) {
            $location.path("/main");
        }).error(function (error) {
            
            $scope.authenticationError = error;
             
            // Deployd의 이상으로 400 error 발생
            // 임시로 성공으로 한다.
            //$location.path("/main");
        });
    }
})
.controller("mainCtrl", function($scope) {

    $scope.screens = ["Products", "Orders"];
    $scope.current = $scope.screens[0];

    $scope.setScreen = function (index) {
        $scope.current = $scope.screens[index];
    };

    $scope.getScreen = function () {
        return $scope.current == "Products"
            ? "/views/adminProducts.html" : "/views/adminOrders.html";
    };
})
.controller("ordersCtrl", function ($scope, $http, ordersUrl) {

    $http.get(ordersUrl, { withCredentials: true })
        .success(function (data) {
            //alert("success:"+data.length);
            $scope.orders = data;
        })
        .error(function (error) {
            alert("error:"+error);
            $scope.error = error;
        });

    $scope.selectedOrder;

    $scope.selectOrder = function (order) {
        $scope.selectedOrder = order;
    };

    $scope.calcTotal = function (order) {
        var total = 0;
        for (var i = 0; i < order.products.length; i++) {
            total +=
                order.products[i].count * order.products[i].price;
        }
        return total;
    }
});
