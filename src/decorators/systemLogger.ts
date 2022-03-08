export class Logger {
    public static printInstances(): string {
        return '';
    };
}

export function loggerErrorInstances () {
    // TODO: Add loggers specific for instances
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.error( `
        Error:
            ${target}
            ${propertyKey}
            ${descriptor}
        ` );
    };
}
