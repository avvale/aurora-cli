import { Property } from '@cliter/utils';
import * as handlebars from 'handlebars';
import * as _ from 'lodash';

handlebars.registerHelper('allowProperty', function(moduleName, property: Property)
{
    if (property.isI18n)
    {
        return property.name !== 'id'
                && property.name !== _.camelCase(moduleName) + 'Id'
                && property.name !== 'createdAt'
                && property.name !== 'updatedAt'
                && property.name !== 'deletedAt';
    }
    else
    {
        return true;
    }
});