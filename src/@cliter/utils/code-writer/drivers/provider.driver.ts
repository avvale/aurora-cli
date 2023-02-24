import { ObjectLiteralExpression, PropertyAssignment } from 'ts-morph';

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
                property.getInitializer()?.getText() === provide
            )
            {
                return true;
            }
        }

        return false;
    }
}
