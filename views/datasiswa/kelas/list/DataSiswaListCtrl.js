'use strict';
app.controller('DataSiswaListCtrl', ['$scope', '$filter', '$rootScope', '$state', 'GetSiswasArr',
    DataSiswaListCtrl
]);

function DataSiswaListCtrl($scope, $filter, $rootScope, $state, GetSiswasArr) {
    $scope.idKelas = $state.params.kelas;
    $scope.breadCrumb = $rootScope.Kelas.getKelasName($scope.idKelas) + ' - LIST';
    $scope.kelasTujuan = {};

    $scope.listKelasArr = $filter('filter')($rootScope.Kelas.ListKelas, {
        'SubClass': true
    }, true);

    $scope.getTglLengkap = function(milisecond) {
        return moment(milisecond).format('DD MMM YYYY');
    };

    $scope.ListSiswas = GetSiswasArr;

    $scope.selectedSiswas = {};
    $scope.clickSiswa = function(selected) {

        if ($scope.selectedSiswas[selected.$id]) {
            delete $scope.selectedSiswas[selected.$id];
        } else {
            $scope.selectedSiswas[selected.$id] = selected;
        }

    };

    $scope.clickSiswaCount = function() {
        if ($.isEmptyObject($scope.selectedSiswas)) {
            return 0;
        } else {
            var i = 0;
            angular.forEach($scope.selectedSiswas, function(value, key) {
                i++
            });
            return i;
        }
    };


    $scope.pindahKelas = function() {


        if ($.isEmptyObject($scope.selectedSiswas)) {
            alert('Silahkan Pilih Siswa Yang Akan Pindah Kelas');
            return;
        }

        if ($.isEmptyObject($scope.kelasTujuan)) {
            alert('Silahkan Pilih Kelas Tujuan!');
            return;
        }

        _.each($scope.selectedSiswas, function(singleRecord, key, list) {
            singleRecord.KelasSekarang = $scope.kelasTujuan.originalObject.$id;
            singleRecord.Sync = 0;
            GetSiswasArr.$save(singleRecord);
        });
        alert('Berhasil pindah kelas ke ' + $scope.kelasTujuan.originalObject.Name);
        $scope.selectedSiswas = {};
       

    };
}
