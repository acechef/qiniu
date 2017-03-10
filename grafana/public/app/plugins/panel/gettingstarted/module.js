///<reference path="../../../headers/common.d.ts" />
System.register(["app/plugins/sdk", "app/core/core"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var sdk_1, core_1, GettingStartedPanelCtrl;
    return {
        setters: [
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {///<reference path="../../../headers/common.d.ts" />
            GettingStartedPanelCtrl = (function (_super) {
                __extends(GettingStartedPanelCtrl, _super);
                /** @ngInject **/
                function GettingStartedPanelCtrl($scope, $injector, backendSrv, datasourceSrv, $q) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.backendSrv = backendSrv;
                    _this.datasourceSrv = datasourceSrv;
                    _this.$q = $q;
                    _this.stepIndex = 0;
                    _this.steps = [];
                    _this.steps.push({
                        // title: 'Install Grafana',
                        title: '安装 Grafana',
                        icon: 'icon-gf icon-gf-check',
                        href: 'http://docs.grafana.org/',
                        target: '_blank',
                        // note: 'Review the installation docs',
                        note: '查看安装文档',
                        check: function () { return $q.when(true); },
                    });
                    _this.steps.push({
                        // title: 'Create your first data source',
                        title: '创建您的第一个数据源',
                        // cta: 'Add data source',
                        cta: '添加数据源',
                        icon: 'icon-gf icon-gf-datasources',
                        href: 'datasources/new?gettingstarted',
                        check: function () {
                            return $q.when(datasourceSrv.getMetricSources().filter(function (item) {
                                return item.meta.builtIn === false;
                            }).length > 0);
                        }
                    });
                    _this.steps.push({
                        // title: 'Create your first dashboard',
                        title: '创建您的第一个 dashboard',
                        // cta: 'New dashboard',
                        cta: '新建 dashboard',
                        icon: 'icon-gf icon-gf-dashboard',
                        href: 'dashboard/new?gettingstarted',
                        check: function () {
                            return _this.backendSrv.search({ limit: 1 }).then(function (result) {
                                return result.length > 0;
                            });
                        }
                    });
                    _this.steps.push({
                        // title: 'Invite your team',
                        title: '邀请您的团队',
                        // cta: 'Add Users',
                        cta: '添加用户',
                        icon: 'icon-gf icon-gf-users',
                        href: 'org/users?gettingstarted',
                        check: function () {
                            return _this.backendSrv.get('api/org/users').then(function (res) {
                                return res.length > 1;
                            });
                        }
                    });
                    _this.steps.push({
                        // title: 'Install apps & plugins',
                        title: '安装应用与插件',
                        // cta: 'Explore plugin repository',
                        cta: '探索插件库',
                        icon: 'icon-gf icon-gf-apps',
                        href: 'https://grafana.net/plugins?utm_source=grafana_getting_started',
                        check: function () {
                            return _this.backendSrv.get('api/plugins', { embedded: 0, core: 0 }).then(function (plugins) {
                                return plugins.length > 0;
                            });
                        }
                    });
                    return _this;
                }
                GettingStartedPanelCtrl.prototype.$onInit = function () {
                    var _this = this;
                    this.stepIndex = -1;
                    return this.nextStep().then(function (res) {
                        _this.checksDone = true;
                    });
                };
                GettingStartedPanelCtrl.prototype.nextStep = function () {
                    var _this = this;
                    if (this.stepIndex === this.steps.length - 1) {
                        return this.$q.when();
                    }
                    this.stepIndex += 1;
                    var currentStep = this.steps[this.stepIndex];
                    return currentStep.check().then(function (passed) {
                        if (passed) {
                            currentStep.cssClass = 'completed';
                            return _this.nextStep();
                        }
                        currentStep.cssClass = 'active';
                        return _this.$q.when();
                    });
                };
                GettingStartedPanelCtrl.prototype.dismiss = function () {
                    this.row.removePanel(this.panel, false);
                    this.backendSrv.request({
                        method: 'PUT',
                        url: '/api/user/helpflags/1',
                        showSuccessAlert: false,
                    }).then(function (res) {
                        core_1.contextSrv.user.helpFlags1 = res.helpFlags1;
                    });
                };
                return GettingStartedPanelCtrl;
            }(sdk_1.PanelCtrl));
            GettingStartedPanelCtrl.templateUrl = 'public/app/plugins/panel/gettingstarted/module.html';
            exports_1("GettingStartedPanelCtrl", GettingStartedPanelCtrl);
            exports_1("PanelCtrl", GettingStartedPanelCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map