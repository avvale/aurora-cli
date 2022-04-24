import { Property } from '../../../@cliter';
import * as handlebars from 'handlebars';

handlebars.registerHelper('isPivotPath', function (property: Property, boundedContextName: string, moduleName: string)
{
    return property.pivotPath === `${boundedContextName}/${moduleName}`;
});
