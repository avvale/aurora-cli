export function ActionScope(scope: string) {
    return function <T extends { new(...args: any[]): { /**/ }; }>(constructor: T) {
        return class extends constructor {
            actionScope = scope;
        };
    };
}
