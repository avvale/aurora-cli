export function ActionScope(scope: string) {
    return function (constructor: Function) {
        constructor.prototype.actionScope = scope;
    };
}
