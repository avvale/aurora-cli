import { Mocker, MockerFixed, ModuleDefinitionSchema, Property, PropertyType, getPropertyEnumOptions } from '../../../@cliter';
import { v5 as uuidv5 } from 'uuid';
import * as handlebars from 'handlebars';
import * as _ from 'lodash';

enum MockType
{
    FIXED_UUID  = 'fixedUuid',
    POSTMAN     = 'postman',
    SEED        = 'seed',
    FIXED_DATA  = 'fixedData',
}

handlebars.registerHelper('mocker', function(
    {
        type                    = MockType.SEED,
        property                = undefined,
        uuidSeed                = 'aurora',
        hasUuidSeed             = true,             // boolean to allow for create the same uuid
        scapeQuotes             = true,
        checkFieldNameMeaning   = true,
        length                  = undefined,
        maxLength               = undefined,
        minLength               = undefined,
        totalDigits             = undefined,
        decimalDigits           = undefined,
        schema                  = undefined,
    }: {
        type?: MockType;
        property?: Property;
        uuidSeed?: string;
        hasUuidSeed?: boolean;
        scapeQuotes?: boolean;
        checkFieldNameMeaning?: boolean;
        length?: number;
        maxLength?: number;
        minLength?: number;
        totalDigits?: number;
        decimalDigits?: number;
        schema?: ModuleDefinitionSchema;
    } = {}
)
{
    // namespace to generate same uuid, see https://www.npmjs.com/package/uuid
    const namespace = '01a94203-63ba-4c07-bb92-bb61cd2b8e41';

    // take uuid seed or use aurora word to generate uuid
    if (type === MockType.FIXED_UUID) return uuidv5(uuidSeed, namespace);

    // set spanish uuid language, for langId field in i18n entity
    if (
        property?.type === PropertyType.ID
        && (length || property?.length) === 36
        && property.isI18n
        && property.name === 'langId'
    ) return '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a';

    if (
        property?.type === PropertyType.ID
        && hasUuidSeed
        && (length || property?.length) === 36
    ) return uuidv5(uuidSeed, namespace);

    if (property?.type === PropertyType.ENUM && type === MockType.SEED) return getPropertyEnumOptions(property) ? `${schema?.boundedContextName.toPascalCase()}${schema?.moduleName.toPascalCase()}${property.name.toPascalCase()}.${_.shuffle(getPropertyEnumOptions(property))[0]}` : null;
    if (property?.type === PropertyType.ENUM) return getPropertyEnumOptions(property) ? `'${_.shuffle(getPropertyEnumOptions(property))[0]}'` : null;
    if (property?.type === PropertyType.RELATIONSHIP) return '[]';

    let propertyTotalDigits = 5;
    let propertyDecimalDigits = 3;

    if (property && Array.isArray(property.decimals))
    {
        propertyTotalDigits = property.decimals[0];
        propertyDecimalDigits = property.decimals[1];
    }

    if (type === MockType.FIXED_DATA) return MockerFixed.mock(
        property?.faker ? property.faker : property?.type as string,
        property?.name as string,
        {
            scapeQuotes,
            checkFieldNameMeaning,
            length       : length || property?.length,
            maxLength    : maxLength || (property?.maxLength && property.maxLength > 1 ? property.maxLength - 1 : property && property.maxLength),
            minLength    : minLength || property?.minLength,
            totalDigits  : totalDigits || propertyTotalDigits,
            decimalDigits: decimalDigits || propertyDecimalDigits,
        },
    );

    return new Mocker().mock(
        property?.faker ? property.faker : property?.type as string,
        property?.name as string,
        {
            scapeQuotes,
            checkFieldNameMeaning,
            length       : length || property?.length,
            maxLength    : maxLength || (property?.maxLength && property.maxLength > 1 ? property.maxLength - 1 : property && property.maxLength),
            minLength    : minLength || property?.minLength,
            totalDigits  : totalDigits || propertyTotalDigits,
            decimalDigits: decimalDigits || propertyDecimalDigits,
        },
    );
});
