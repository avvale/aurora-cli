import { Property } from '@cliter/utils';
import * as handlebars from 'handlebars';
import * as _ from 'lodash';

handlebars.registerHelper('isI18NRelationProperty', function(moduleName, property: Property)
{
    return property.isI18n && property.name === _.camelCase(moduleName) + 'Id';
});