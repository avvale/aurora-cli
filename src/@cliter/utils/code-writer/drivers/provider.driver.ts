import { ObjectLiteralExpression, PropertyAssignment, StringLiteral } from 'ts-morph';
import { getInitializer } from '../functions';

export class ProviderDriver
{
    public static changeUseClass(
        object: ObjectLiteralExpression,
        provide: string,
        adapter: string,
    ): void
    {
        if (!(object instanceof ObjectLiteralExpression)) return;

        const properties = object.getProperties();
        for (const property of properties)
        {
            if (!(property instanceof PropertyAssignment)) continue;

            if (
                ProviderDriver.isProvideWanted(object, provide) &&
                property.getName() === 'useClass'
            )
            {
                property.setInitializer(adapter);
                break;
            }
        }
    }

    public static isProvideWanted(
        object: ObjectLiteralExpression,
        provide: string,
    ): boolean
    {
        if (!(object instanceof ObjectLiteralExpression)) return false;

        const properties = object.getProperties();
        for (const property of properties)
        {
            if (!(property instanceof PropertyAssignment)) continue;

            if (
                property.getName() === 'provide' &&
                (<StringLiteral>getInitializer(property))?.getText() === provide
            )
            {
                return true;
            }
        }

        return false;
    }
}
