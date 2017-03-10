///<reference path="../../../headers/common.d.ts" />
System.register(["lodash", "app/plugins/sdk", "app/features/dashboard/impression_store"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var lodash_1, sdk_1, impression_store_1, DashListCtrl;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (impression_store_1_1) {
                impression_store_1 = impression_store_1_1;
            }
        ],
        execute: function () {///<reference path="../../../headers/common.d.ts" />
            DashListCtrl = (function (_super) {
                __extends(DashListCtrl, _super);
                /** @ngInject */
                function DashListCtrl($scope, $injector, backendSrv) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.backendSrv = backendSrv;
                    _this.panelDefaults = {
                        query: '',
                        limit: 10,
                        tags: [],
                        recent: false,
                        search: false,
                        starred: true,
                        headings: true,
                    };
                    lodash_1.default.defaults(_this.panel, _this.panelDefaults);
                    if (_this.panel.tag) {
                        _this.panel.tags = [_this.panel.tag];
                        delete _this.panel.tag;
                    }
                    _this.events.on('refresh', _this.onRefresh.bind(_this));
                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.groups = [
                        // {list: [], show: false, header: "Starred dashboards",},
                        // {list: [], show: false, header: "Recently viewed dashboards"},
                        // {list: [], show: false, header: "Search"},
                        { list: [], show: false, header: "星标 dashboards", },
                        { list: [], show: false, header: "最近查看的 dashboards" },
                        { list: [], show: false, header: "查找" },
                    ];
                    // update capability
                    if (_this.panel.mode) {
                        if (_this.panel.mode === 'starred') {
                            _this.panel.starred = true;
                            _this.panel.headings = false;
                        }
                        if (_this.panel.mode === 'recently viewed') {
                            _this.panel.recent = true;
                            _this.panel.starred = false;
                            _this.panel.headings = false;
                        }
                        if (_this.panel.mode === 'search') {
                            _this.panel.search = true;
                            _this.panel.starred = false;
                            _this.panel.headings = false;
                        }
                        delete _this.panel.mode;
                    }
                    return _this;
                }
                DashListCtrl.prototype.onInitEditMode = function () {
                    this.editorTabIndex = 1;
                    this.modes = ['starred', 'search', 'recently viewed'];
                    this.addEditorTab('Options', 'public/app/plugins/panel/dashlist/editor.html');
                };
                DashListCtrl.prototype.onRefresh = function () {
                    var promises = [];
                    promises.push(this.getRecentDashboards());
                    promises.push(this.getStarred());
                    promises.push(this.getSearch());
                    return Promise.all(promises)
                        .then(this.renderingCompleted.bind(this));
                };
                DashListCtrl.prototype.getSearch = function () {
                    var _this = this;
                    this.groups[2].show = this.panel.search;
                    if (!this.panel.search) {
                        return Promise.resolve();
                    }
                    var params = {
                        limit: this.panel.limit,
                        query: this.panel.query,
                        tag: this.panel.tags,
                    };
                    return this.backendSrv.search(params).then(function (result) {
                        _this.groups[2].list = result;
                    });
                };
                DashListCtrl.prototype.getStarred = function () {
                    var _this = this;
                    this.groups[0].show = this.panel.starred;
                    if (!this.panel.starred) {
                        return Promise.resolve();
                    }
                    var params = { limit: this.panel.limit, starred: "true" };
                    return this.backendSrv.search(params).then(function (result) {
                        _this.groups[0].list = result;
                    });
                };
                DashListCtrl.prototype.getRecentDashboards = function () {
                    var _this = this;
                    this.groups[1].show = this.panel.recent;
                    if (!this.panel.recent) {
                        return Promise.resolve();
                    }
                    var dashIds = lodash_1.default.take(impression_store_1.impressions.getDashboardOpened(), this.panel.limit);
                    return this.backendSrv.search({ dashboardIds: dashIds, limit: this.panel.limit }).then(function (result) {
                        _this.groups[1].list = dashIds.map(function (orderId) {
                            return lodash_1.default.find(result, function (dashboard) {
                                return dashboard.id === orderId;
                            });
                        }).filter(function (el) {
                            return el !== undefined;
                        });
                    });
                };
                return DashListCtrl;
            }(sdk_1.PanelCtrl));
            DashListCtrl.templateUrl = 'module.html';
            exports_1("DashListCtrl", DashListCtrl);
            exports_1("PanelCtrl", DashListCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map