import * as handlebars from 'handlebars';
import { Property, getPropertiesFromPropertyRelationship } from '../..';

handlebars.registerHelper('getPropertiesFromPropertyRelationship', function(
    modulePath: string,
): Property[] | null
{
    return getPropertiesFromPropertyRelationship(
        modulePath,
    );
});
