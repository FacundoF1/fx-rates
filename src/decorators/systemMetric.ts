export class Metric {
    public static printInstances(): string {
        return '';
    };
}

export function metricInstances<T extends { new(...args: any[]): {} }>(constructor: T) {
    // TODO: Add metrics specific for instances
    return class extends constructor {
        // constructor.name
    };
}
