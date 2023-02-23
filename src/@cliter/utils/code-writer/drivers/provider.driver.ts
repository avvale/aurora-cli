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
        let isProvideWanted = false;
        for (const property of properties)
        {
            if (!(property instanceof PropertyAssignment)) continue;

            if (
                property.getName() === 'provide' &&
                property.getInitializer()?.getText() === provide
            )
            {
                isProvideWanted = true;
            }

            if (
                isProvideWanted &&
                property.getName() === 'useClass'
            )
            {
                property.setInitializer(adapter);
                break;
            }
        }
    }
}
