import { Mocker, Property, SqlType } from '../../../@cliter';
import * as handlebars from 'handlebars';
import * as _ from 'lodash';

enum MockType
{
    SEED    = 'seed',
    POSTMAN = 'postman',
}

handlebars.registerHelper('mocker', function(
    {
        type         = MockType.SEED,
        property     = undefined,
        useCurrentId = false,
    }: {
        type?: MockType;
        property?: Property;
        useCurrentId?: boolean;
    } = {}
)
{
    // create mocker object
    const mocker = new Mocker();

    if (type === MockType.SEED)
    {

    }

    if (type === MockType.POSTMAN)
    {
        // return data defined in yaml model definition
        if (property?.type === SqlType.ID && useCurrentId)  return property.id;
        if (property?.type === SqlType.ENUM)                return property.enumOptions ? _.shuffle(property.enumOptions)[0] : null;

        return mocker.mock(
            property?.type as string,
            property?.name as string,
            {
                scapeQuotes: true,
                length     : property?.length,
                maxLength  : property?.maxLength,
                minLength  : property?.minLength,
            }
        );
    }
});