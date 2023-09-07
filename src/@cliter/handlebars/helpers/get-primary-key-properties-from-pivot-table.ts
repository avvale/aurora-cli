import * as handlebars from 'handlebars';
import { Property, getPrimaryKeyPropertiesFromPivotTable } from '../..';

handlebars.registerHelper('getPrimaryKeyPropertiesFromPivotTable', function(
    properties: Property[],
): Property[]
{
    return getPrimaryKeyPropertiesFromPivotTable(
        properties,
    );
});
