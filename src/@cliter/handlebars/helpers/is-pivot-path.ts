import { Property } from '../../../@cliter';
import * as handlebars from 'handlebars';

handlebars.registerHelper('isPivotPath', function (property: Property, boundedContextName: string, moduleName: string)
{
    // TODO BORRAR ESTA COMPROBACIÓN
    return false;
    // return property.relationship?.pivot?.modulePath === `${boundedContextName}/${moduleName}`;
});
