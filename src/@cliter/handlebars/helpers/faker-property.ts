import * as handlebars from 'handlebars';
import { fakerByPropertyType, fakerHelper, getFakerHelperParams } from './common-functions';
import { Property } from './../../utils/property';
import { SqlType } from '../../types/sql-type';
import * as _ from 'lodash';

handlebars.registerHelper('fakerProperty', function(property: Property, ...options)
{
    const params = getFakerHelperParams(options, property);

    // check viability of faker property
    if (property.faker)
    {
        const mock = fakerHelper(property.faker, params);
        if (mock) return mock;
    }

    // check special types
    if (property.type === SqlType.RELATIONSHIP) return '[]';
    if (property.type === SqlType.ENUM)         return property.enumOptions ? _.shuffle(property.enumOptions)[0] : null;


    return fakerByPropertyType(property, params);
});