import { Property } from '../../../@cliter';
import * as handlebars from 'handlebars';
import * as _ from 'lodash';

handlebars.registerHelper('isI18NRelationProperty', function(moduleName: string, property: Property)
{
    return property.isI18n && property.name === _.camelCase(moduleName) + 'Id';
});