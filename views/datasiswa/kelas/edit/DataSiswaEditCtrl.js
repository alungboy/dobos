'use strict';
app.controller('DataSiswaEditCtrl', ['$scope', '$rootScope', '$state', 'GetSiswaSingleObj',
    DataSiswaEditCtrl
]);

function DataSiswaEditCtrl($scope, $rootScope, $state, GetSiswaSingleObj) {
    $scope.idKelas = $state.params.kelas;
    $scope.breadCrumb = $rootScope.Kelas.getKelasName($scope.idKelas) + ' - EDIT';
    $scope.getTglLengkap = function(milisecond) {
        return moment(milisecond).format('DD MMM YYYY');
    };

    $scope.EditSiswa = GetSiswaSingleObj;

    $scope.date = {}
    $scope.date.TglLahir = new Date($scope.EditSiswa.TglLahir);
    $scope.date.TglMasukSekolah = new Date($scope.EditSiswa.TglMasukSekolah);


    $scope.errMsg = null;

    $scope.toDetail = function() {
        $state.go('app.datasiswa.kelas.detail', {
            noInduk: $state.params.noInduk
        });
    };

    $scope.delSiswa = function() {
        if ($rootScope.User.uid === 'facebook:10152952945491827' || $rootScope.User.uid === 'facebook:10205456582351484') {
            var r = confirm("Apakah anda mau menghapus " + $scope.EditSiswa.NamaDepan + ' ' + $scope.EditSiswa.NamaBelakang);
            if (r == true) {
                $scope.EditSiswa.$remove().then(function(ref) {
                    alert('berhasil hapus!');
                    $state.go('app.datasiswa.kelas.list');
                }, function(error) {
                    console.log("Error:", error);
                });
            } else {
                return;
            }


        }
    };

    $scope.updateSiswa = function(siswaIn) {
        $scope.errMsg = null;
        if (!siswaIn.$id || siswaIn.$id.length < 1) {
            $scope.errMsg = 'No Induk Wajib Diisi';
            return;
        }
        if (!siswaIn.NamaDepan || siswaIn.NamaDepan.length < 1) {
            $scope.errMsg = 'Nama Depan Wajib Diisi';
            return;
        }
        if (!siswaIn.TempatLahir || siswaIn.TempatLahir.length < 1) {
            $scope.errMsg = 'Tempat Lahir Wajib Diisi';
            return;
        }
        if (!$scope.date.TglLahir || $scope.date.TglLahir.length < 1) {
            $scope.errMsg = 'Tanggal Lahir Wajib Diisi';
            return;
        }
        if (!siswaIn.JnsKelamin || siswaIn.JnsKelamin.length < 1) {
            $scope.errMsg = 'Silahkan Pilih Jenis Kelamin';
            return;
        }
        if (!siswaIn.Kewarganegaraan || siswaIn.Kewarganegaraan.length < 1) {
            $scope.errMsg = 'Kewarganegaraan Wajib Diisi';
            return;
        }
        if (!siswaIn.Agama || siswaIn.Agama.length < 1) {
            $scope.errMsg = 'Silahkan Pilih Agama';
            return;
        }
        if (!siswaIn.IuranSekolah || siswaIn.IuranSekolah.length < 1) {
            $scope.errMsg = 'Iuran Sekolah Wajib Diisi';
            return;
        }
        if (!siswaIn.IuranPembangunan || siswaIn.IuranPembangunan.length < 1) {
            $scope.errMsg = 'Iuran Pembangunan Wajib Diisi';
            return;
        }
        if (!siswaIn.Status || siswaIn.Status.length < 1) {
            $scope.errMsg = 'Silahkan Pilih Status';
            return;
        }

        $scope.EditSiswa.TglLahir = ($scope.date.TglLahir).valueOf();
        $scope.EditSiswa.TglMasukSekolah = ($scope.date.TglMasukSekolah).valueOf();

        $scope.EditSiswa.Sync = 0;

        $scope.EditSiswa.$save().then(function(ref) {

            $state.go('app.datasiswa.kelas.detail', {
                noInduk: $state.params.noInduk
            });

        }, function(error) {
            $scope.errMsg = error;
            console.log("Error:", error);
        });

    };

}
