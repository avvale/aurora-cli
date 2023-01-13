export class GlobalState
{
    private static store: any = {};

    static setValue(key: string, value: any): void
    {
        GlobalState.store[key] = value;
    }

    static getValue(key: string, defaultValue?: any): any
    {
        if (!GlobalState.hasValue(key) && defaultValue) return defaultValue;
        return GlobalState.store[key];
    }

    static hasValue(key: string): boolean
    {
        return Object.prototype.hasOwnProperty.call(GlobalState.store, key);
    }
}
