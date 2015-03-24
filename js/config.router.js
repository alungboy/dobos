'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {

                $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
                    if (error === "AUTH_REQUIRED") {
                        $state.go("access.login");
                        event.preventDefault();
                    }
                });

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;


            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
            function($stateProvider, $urlRouterProvider, JQ_CONFIG) {

                $urlRouterProvider
                    .when('', '/app/home')
                    .when('/', '/app/home')
                    .otherwise('/access/404');
                $stateProvider
                // Access
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('access.login', {
                        url: '/login',
                        templateUrl: 'views/access/login.html',
                        controller: 'LoginCtrl',
                        resolve: {

                        }
                    })
                    .state('access.404', {
                        url: '/404',
                        templateUrl: 'views/access/page_404.html'
                    })

                // App
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'views/app.html',
                    resolve: {
                        "currentAuth": ["FbAuth", function(FbAuth) {
                            return FbAuth.$requireAuth();
                        }]
                    }
                })

                // Home
                .state('app.home', {
                    url: '/home',
                    templateUrl: 'views/home/home.html',
                    controller: 'HomeCtrl',
                })

                // Data Siswa
                .state('app.datasiswa', {
                        url: '/datasiswa/:sekolah',
                        templateUrl: 'views/datasiswa/datasiswa.html',
                        controller: 'DataSiswaCtrl',
                        resolve: {
                            GetSiswaSingleObj: ['SiswaSingleObj',
                                function(SiswaSingleObj) {
                                    return SiswaSingleObj('0')
                                        .$loaded();

                                }
                            ],
                        }
                    })
                    .state('app.datasiswa.kelas', {
                        abstract: true,
                        url: '/kelas/:kelas',
                        template: '<div ui-view class="fade-in-up"></div>',
                        
                    })
                    .state('app.datasiswa.kelas.list', {
                        url: '/list',
                        templateUrl: 'views/datasiswa/kelas/list/list.html',
                        controller: 'DataSiswaListCtrl',
                        resolve: {
                            GetSiswasArr: ['$stateParams', 'SiswasArr',
                                function($stateParams, SiswasArr) {
                                    return SiswasArr($stateParams.kelas)
                                        .$loaded();
                                }
                            ],
                        }
                    })
                    .state('app.datasiswa.kelas.new', {
                        url: '/new',
                        templateUrl: 'views/datasiswa/kelas/new/new.html',
                        controller: 'DataSiswaNewCtrl',
                        resolve: {
                            GetSiswaSingleObj: ['SiswaSingleObj',
                                function(SiswaSingleObj) {
                                    return SiswaSingleObj('0')
                                        .$loaded();

                                }
                            ],
                        }
                    })
                    .state('app.datasiswa.kelas.detail', {
                        url: '/detail/:noInduk',
                        templateUrl: 'views/datasiswa/kelas/detail/detail.html',
                        controller: 'DataSiswaDetailCtrl',
                        resolve: {
                            GetSiswaSingleObj: ['$stateParams', 'SiswaSingleObj',
                                function($stateParams, SiswaSingleObj) {
                                    return SiswaSingleObj($stateParams.noInduk)
                                        .$loaded();
                                }
                            ],
                        }
                    })
                    .state('app.datasiswa.kelas.edit', {
                        url: '/edit/:noInduk',
                        templateUrl: 'views/datasiswa/kelas/edit/edit.html',
                        controller: 'DataSiswaEditCtrl',
                        resolve: {
                            GetSiswaSingleObj: ['$stateParams', 'SiswaSingleObj',
                                function($stateParams, SiswaSingleObj) {
                                    return SiswaSingleObj($stateParams.noInduk)
                                        .$loaded();
                                }
                            ],
                        }
                    })

                .state('app.iuransekolah', {
                        url: '/iuransekolah',
                        templateUrl: 'views/iuransekolah/iuransekolah.html',

                    })
                    .state('app.iuranpembangunan', {
                        url: '/iuranpembangunan',
                        templateUrl: 'views/iuranpembangunan/iuranpembangunan.html',

                    })
                    .state('app.smstunggakan', {
                        url: '/smstunggakan',
                        templateUrl: 'views/smstunggakan/smstunggakan.html',

                    })
                    .state('app.smspengumuman', {
                        url: '/smspengumuman',
                        templateUrl: 'views/smspengumuman/smspengumuman.html',

                    })
                    .state('app.configs', {
                        url: '/smspengumuman',
                        templateUrl: 'views/configs/configs.html',

                    })



            }
        ]
    );
