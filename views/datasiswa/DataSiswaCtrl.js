'use strict';
app.controller('DataSiswaCtrl', ['$scope', '$state', '$rootScope', 
    DataSiswaCtrl
]);

function DataSiswaCtrl($scope, $state, $rootScope) {
	$scope.activeClass = function(idKelas){
		if(idKelas == $state.params.kelas){
			return true;
		}else{
			return false;
		}
	};

    $scope.idSekolah = $state.params.sekolah;
    $scope.ListKelas = $rootScope.Kelas.ListKelas;
    $scope.namaSekolah = $rootScope.Kelas.getKelasName($scope.idSekolah);
    $scope.toSiswaKelas = function(idkelas){
    	$state.go('app.datasiswa.kelas', {
    		kelas: idkelas
    	});
    }

}
