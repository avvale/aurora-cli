import * as handlebars from 'handlebars';
import * as _ from 'lodash';

handlebars.registerHelper('allowI18nProperty2', function(moduleName, propertyName)
{
    return propertyName !== 'id'
        && propertyName !== _.camelCase(moduleName) + 'Id'
        && propertyName !== 'createdAt'
        && propertyName !== 'updatedAt'
        && propertyName !== 'deletedAt';
});