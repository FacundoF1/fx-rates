"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countInstances = exports.Monitor = void 0;
class Monitor {
    static printInstances() {
        let response = '';
        Counter.objectsCount.forEach((value, key) => {
            response = response + `${key}: ${value} \n `;
        });
        return response;
    }
    ;
}
exports.Monitor = Monitor;
class Counter {
    static increment(className) {
        const currentValue = this.objectsCount.get(className);
        !currentValue
            ? this.objectsCount.set(className, 1)
            : this.objectsCount.set(className, currentValue + 1);
    }
}
Counter.objectsCount = new Map();
function countInstances(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.abc = Counter.increment(constructor.name);
        }
    };
}
exports.countInstances = countInstances;
//# sourceMappingURL=systemCounter.js.map