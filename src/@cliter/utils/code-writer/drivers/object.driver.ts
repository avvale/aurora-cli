import { ObjectLiteralElementLike, ObjectLiteralExpression, PropertyAssignment } from 'ts-morph';
import { getInitializer } from '../functions';

export class ObjectDriver
{
    public static getProperty<T = ObjectLiteralElementLike>(
        object: ObjectLiteralExpression,
        property: string,
    ): T
    {
        return object.getProperty(property) as T;
    }

    public static getInitializerProperty<T>(
        object: ObjectLiteralExpression,
        property: string,
    ): T
    {
        return <T>getInitializer(ObjectDriver.getProperty<PropertyAssignment>(object, property));
    }
}
