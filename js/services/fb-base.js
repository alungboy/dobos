"use strict";

angular.module('Fbase', ['app', 'firebase'])

.factory('Fbase', ['FBURL', function(FBURL, $firebaseAuth) {
        var RefFactory = new Firebase(FBURL);
        return RefFactory;
    }
])

.factory('FbAuth', ['Fbase', '$firebaseAuth',   function(Fbase, $firebaseAuth) {
        var auth = $firebaseAuth(Fbase);
        return auth;
    }
])

.service("UserObj", ['Fbase', 'FbAuth', "$firebaseObject", function(Fbase, FbAuth, $firebaseObject) {
    var getObj = function() {
        var user = FbAuth.$getAuth();
        if (user) {
            return $firebaseObject(Fbase.child('users').child(user.uid));
        }
        return null;
    };
    return getObj;
}])

.factory("UserRef", ['Fbase', 'FbAuth', "$firebaseObject", function(Fbase, FbAuth, $firebaseObject) {
    var objRef = null
    var getRef = function() {
        if (!objRef) {
            var user = FbAuth.$getAuth();
            if (user) {
                objRef = Fbase.child('users').child(user.uid);
            }

        }
        return objRef;
    };
    return getRef;
}])

.factory("UsersObj", ['Fbase', "$firebaseObject", function(Fbase, $firebaseObject) {
    var usersFactory = null
    var get = function() {
        if (!usersFactory) {
            usersFactory = $firebaseObject(Fbase.child('users'));
        }
        return usersFactory;
    };
    return get;
}])

// Data Siswa > List Sekolah


.factory("AllKelasArr", ['Fbase', '$firebaseArray',  function(Fbase, $firebaseArray) {
    var allKelas = [];
    var get = function() {
            if (allKelas.length < 1) {
                  var obj = Fbase.child('kelas');
                  allKelas = $firebaseArray(obj);
            }
        return allKelas;
    };

    return get;
}])


// Data Siswa > List Kelas > List Siswa

.service("SiswasArr", ['Fbase', '$firebaseArray',  function(Fbase, $firebaseArray) {

    var get = function(kelas) {
        if (kelas) {
            var obj = Fbase.child('siswa').orderByChild('KelasSekarang').equalTo(kelas);
        } else {
            var obj = {};
        }
        return $firebaseArray(obj);
    };

    return get;
}])


.service("SiswasObj", ['Fbase', '$firebaseObject',  function(Fbase, $firebaseObject) {

    var get = function(kelas) {
        if (kelas) {
            var obj = Fbase.child('siswa').orderByChild('KelasSekarang').equalTo(kelas);
        } else {
            var obj = {};
        }
        return $firebaseObject(obj);
    };

    return get;
}])

.service("SiswaSingleObj", ['Fbase', '$firebaseObject',  function(Fbase, $firebaseObject) {
    var get = function(noInduk) {
        if (noInduk) {
            var obj = Fbase.child('siswa').child(noInduk);

        } else {
            var obj = {};
        }
        return $firebaseObject(obj);
    };

    return get;
}])





;