import { Property } from '../..';
import * as handlebars from 'handlebars';
import * as _ from 'lodash';

handlebars.registerHelper('isAllowProperty', function(moduleName: string, property: Property): boolean
{
    if (property.isI18n)
    {
        return property.name !== 'id' &&
            property.name !== _.camelCase(moduleName) + 'Id' &&
            property.name !== 'createdAt' &&
            property.name !== 'updatedAt' &&
            property.name !== 'deletedAt';
    }

    return true;
});
