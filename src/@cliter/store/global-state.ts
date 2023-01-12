export class GlobalState
{
    private static store: any;

    static setValue(key: string, value: any): void
    {
        GlobalState.store[key] = value;
    }

    static getValue(key: string): any
    {
        return GlobalState.store[key];
    }

    static hasValue(key: string): boolean
    {
        return Object.prototype.hasOwnProperty.call(GlobalState.store, key);
    }
}
