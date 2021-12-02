import { Mocker, Property, SqlType } from '../../../@cliter';
import * as handlebars from 'handlebars';
import * as _ from 'lodash';
import { v5 as uuidv5 } from 'uuid';

enum MockType
{
    SEED    = 'seed',
    POSTMAN = 'postman',
    UUID    = 'uuid',
}

handlebars.registerHelper('mocker', function(
    {
        type        = MockType.SEED,
        property    = undefined,
        uuidSeed    = 'aurora',
        hasUuidSeed = true,             // boolean to allow for create the same uuid
        scapeQuotes = true,
    }: {
        type?: MockType;
        property?: Property;
        uuidSeed?: string;
        hasUuidSeed?: boolean;
        scapeQuotes?: boolean;
    } = {}
)
{
    // create mocker object
    const mocker    = new Mocker();

    // namespace to generate same uuid, see https://www.npmjs.com/package/uuid
    const namespace = '01a94203-63ba-4c07-bb92-bb61cd2b8e41';

    if (type === MockType.UUID)
    {
        // take uuid seed or use aurora word to generate uuid
        return uuidv5(uuidSeed, namespace);
    }

    if (type === MockType.POSTMAN || type === MockType.SEED)
    {
        // return data defined in yaml model definition
        if (property?.type === SqlType.ID && hasUuidSeed)   return uuidv5(uuidSeed, namespace);
        if (property?.type === SqlType.ENUM)                return property.enumOptions ? _.shuffle(property.enumOptions)[0] : null;
        if (property?.type === SqlType.RELATIONSHIP)        return '[]';

        return mocker.mock(
            property?.faker ? property.faker : property?.type as string,
            property?.name as string,
            {
                scapeQuotes,
                checkFieldNameMeaning: true,
                length               : property?.length,
                maxLength            : property?.maxLength,
                minLength            : property?.minLength,
            }
        );
    }
});