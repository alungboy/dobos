'use strict';
app.controller('DataSiswaDetailCtrl', ['$scope', '$rootScope', '$state', 'GetSiswaSingleObj',
    DataSiswaDetailCtrl
]);

function DataSiswaDetailCtrl($scope, $rootScope, $state, GetSiswaSingleObj) {
    $scope.idKelas = $state.params.kelas;
    $scope.breadCrumb = $rootScope.Kelas.getKelasName($scope.idKelas) + ' - DETAIL';
    $scope.getTglLengkap = function(milisecond) {
        return moment(milisecond).format('DD MMM YYYY');
    };
    $scope.getBoolPindahan = function(input) {
        if (input === 1 || input === true) {
            return true;
        }else{
            return false;
        }
        
    };

    $scope.DetailSiswa = GetSiswaSingleObj;
    
    $scope.DetailSiswa.Pindahan = $scope.getBoolPindahan($scope.DetailSiswa.Pindahan);
    $scope.errMsg = null;

    $scope.toEdit = function() {
        $state.go('app.datasiswa.kelas.edit', {
            noInduk: $state.params.noInduk
        });
    };
}
