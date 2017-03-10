// var template = `
// <div class="graph-wrapper" ng-class="{'graph-legend-rightside': ctrl.panel.legend.rightSide}">
//   <div class="graph-canvas-wrapper">
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var template;
    return {
        setters: [],
        execute: function () {// var template = `
            // <div class="graph-wrapper" ng-class="{'graph-legend-rightside': ctrl.panel.legend.rightSide}">
            //   <div class="graph-canvas-wrapper">
            //     <div class="datapoints-warning" ng-show="ctrl.datapointsCount===0">
            //       <span class="small" >
            //         No datapoints <tip>No datapoints returned from metric query</tip>
            //       </span>
            //     </div>
            //     <div class="datapoints-warning" ng-show="ctrl.datapointsOutside">
            //       <span class="small">
            //         Datapoints outside time range
            //         <tip>Can be caused by timezone mismatch between browser and graphite server</tip>
            //       </span>
            //     </div>
            //     <div grafana-graph class="histogram-chart" ng-dblclick="ctrl.zoomOut()">
            //     </div>
            //   </div>
            //   <div class="graph-legend-wrapper" graph-legend></div>
            //   </div>
            // <div class="clearfix"></div>
            // `;
            template = "\n<div class=\"graph-wrapper\" ng-class=\"{'graph-legend-rightside': ctrl.panel.legend.rightSide}\">\n  <div class=\"graph-canvas-wrapper\">\n\n    <div class=\"datapoints-warning\" ng-show=\"ctrl.datapointsCount===0\">\n      <span class=\"small\" >\n        \u65E0\u6570\u636E\u70B9 <tip>\u6CA1\u6709\u6570\u636E\u70B9\u8FD4\u56DE</tip>\n      </span>\n    </div>\n\n    <div class=\"datapoints-warning\" ng-show=\"ctrl.datapointsOutside\">\n      <span class=\"small\">\n        \u6570\u636E\u70B9\u8D85\u51FA\u65F6\u95F4\u8303\u56F4\n        <tip>\u53EF\u80FD\u662F\u7531\u4E8E\u6D4F\u89C8\u5668\u548Cgraphite\u670D\u52A1\u5668\u6240\u5904\u7684\u65F6\u533A\u4E0D\u540C\u800C\u5BFC\u81F4\u7684</tip>\n      </span>\n    </div>\n\n    <div grafana-graph class=\"histogram-chart\" ng-dblclick=\"ctrl.zoomOut()\">\n    </div>\n\n  </div>\n\n  <div class=\"graph-legend-wrapper\" graph-legend></div>\n  </div>\n\n<div class=\"clearfix\"></div>\n";
            exports_1("default", template);
        }
    };
});
//# sourceMappingURL=template.js.map