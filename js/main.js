'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', [
        '$scope', '$rootScope', '$translate', '$localStorage', '$window', 'UserObj', 'UsersObj', 'AllKelasArr',
        AppCtrl
    ]);

function AppCtrl($scope, $rootScope, $translate, $localStorage, $window, UserObj, UsersObj, AllKelasArr) {
    moment.locale('id');
    
    $scope.ListKelas = AllKelasArr();
    $rootScope.Kelas = {};
    $rootScope.Kelas.ListKelas = AllKelasArr();
    $rootScope.Kelas.getKelasName = function(IdKelas) {
        var result = _.find($scope.ListKelas, function(value, key, list) {
            return value.$id == IdKelas;
        });
        if (result) {
            return result.Name;
        }
    };
   
    $scope.navList = [{
        single: true,
        name: 'Home',
        state: 'app.home',
        icon: 'fa fa-home  text-primary-dker ',

    }, {
        multiKelas: true,
        name: 'Data Siswa',
        icon: 'fa fa-users text-success-dker',
        subKelasNav: $scope.ListKelas,
    }, 
    // {
    //     multi: true,
    //     name: 'Iuran',
    //     icon: 'fa fa-area-chart text-info-dker',
    //     subNav: [
    //         {
    //             name: 'Sekolah',
    //             state: 'app.iuransekolah'
    //         },
    //         {
    //             name: 'Pembangunan',
    //             state: 'app.iuranpembangunan'
    //         },

    //     ]
    // }, 
    {
        single: true,
        name: 'SMS Tunggakan',
        state: 'app.smstunggakan',
        icon: 'fa fa-edit text-primary-dker',

    }, {
        single: true,
        name: 'SMS Pengumuman',
        state: 'app.smspengumuman',
        icon: 'fa fa-volume-up text-success-dker',

    }, {
        single: true,
        name: 'Configs',
        state: 'app.configs',
        icon: 'fa fa-cogs text-info-dker',
    }, ];




    $rootScope.User = UserObj();
    $rootScope.Users = UsersObj();
    $scope.User = UserObj();
    $scope.Users = UsersObj();

    // add 'ie' classes to html
    var isIE = !!navigator.userAgent.match(/MSIE/i);
    isIE && angular.element($window.document.body).addClass('ie');
    isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

    // config
    $scope.app = {
        name: 'E-School Online',
        version: '1.3.13',
        // for chart colors
        color: {
            primary: '#7266ba',
            info: '#23b7e5',
            success: '#27c24c',
            warning: '#fad733',
            danger: '#f05050',
            light: '#e8eff0',
            dark: '#3a3f51',
            black: '#1c2b36'
        },
        settings: {
            themeID: 8,
            navbarHeaderColor: 'bg-info dker',
            navbarCollapseColor: 'bg-info dker',
            asideColor: 'bg-light dker b-r',
            headerFixed: true,
            asideFixed: true,
            asideFolded: false,
            asideDock: false,
            container: false
        }
    }

    // save settings to local storage
    // if (angular.isDefined($localStorage.settings)) {
    //     $scope.app.settings = $localStorage.settings;
    // } else {
    //     $localStorage.settings = $scope.app.settings;
    // }


    $localStorage.settings = $scope.app.settings;
    $scope.$watch('app.settings', function() {
        if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
            // aside dock and fixed must set the header fixed.
            $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
    }, true);

    // angular translate
    $scope.lang = {
        isopen: false
    };
    $scope.langs = {
        id_ID: 'Indonesia',
        en: 'English'
    };
    $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "Indonesia";
    $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
    };

    function isSmartDevice($window) {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }

}
