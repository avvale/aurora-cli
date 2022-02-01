import { LiteralObject } from '../types';

export class ObjectTools
{
    static sortByKeys(object: LiteralObject): LiteralObject
    {
       return Object
            .keys(object)
            .sort()
            .reduce((newObject: LiteralObject, key) =>
            {
                newObject[key] = object[key];
                return newObject;
            }, {});
    }
}