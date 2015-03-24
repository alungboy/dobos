'use strict';
app.controller('DataSiswaNewCtrl', ['$scope', '$rootScope', '$state', 'SiswaSingleObj',
    DataSiswaNewCtrl
]);

function DataSiswaNewCtrl($scope, $rootScope, $state, SiswaSingleObj) {
    $scope.idKelas = $state.params.kelas;
    $scope.breadCrumb = $rootScope.Kelas.getKelasName($scope.idKelas) + ' - NEW';
    $scope.getTglLengkap = function(milisecond) {
        return moment(milisecond).format('DD MMM YYYY');
    };

    $scope.newSiswa = {};
    $scope.newSiswa.KelasSekarang = $scope.idKelas;
    $scope.newSiswa.Kewarganegaraan = "Indonesia";

    $scope.date = {};
    $scope.date.TglLahir = new Date();
    $scope.date.TglMasukSekolah = new Date();

    $scope.newSiswa.Status = 'Aktif';
    $scope.errMsg = null;
    $scope.createSiswa = function(siswaIn) {
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
        siswaIn.TglLahir = ($scope.date.TglLahir).valueOf();
        siswaIn.TglMasukSekolah = ($scope.date.TglMasukSekolah).valueOf();

        var NewSiswaObj = SiswaSingleObj(siswaIn.$id);


        NewSiswaObj.$loaded()
            .then(function(data) {

                if (!_.has(NewSiswaObj, '$value') || NewSiswaObj.$value != null) {
                    $scope.errMsg = 'No Induk sudah ada dengan nama siswa ' + NewSiswaObj.NamaDepan + ' ' + NewSiswaObj.NamaBelakang;
                    return;
                }

                if (NewSiswaObj) {

                    _.each(siswaIn, function(value, key, list) {
                        NewSiswaObj[key] = value;
                    });
                    NewSiswaObj.Sync = 0;
                    NewSiswaObj.$save().then(function(ref) {

                        $state.go('app.datasiswa.kelas.list');

                    }, function(error) {
                        $scope.errMsg = error;
                        console.log("Error:", error);
                    });
                }
            })
            .catch(function(error) {

                $scope.errMsg = error;
                console.error("Error:", error);

            });

    };
}
