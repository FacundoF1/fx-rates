"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricInstances = exports.Metric = void 0;
class Metric {
    static printInstances() {
        return '';
    }
    ;
}
exports.Metric = Metric;
function metricInstances(constructor) {
    // TODO: Add metrics specific for instances
    return class extends constructor {
    };
}
exports.metricInstances = metricInstances;
//# sourceMappingURL=systemMetric.js.map