import * as handlebars from 'handlebars';
import { getModuleNameFromPropertyRelationship } from '../..';

handlebars.registerHelper('getModuleNameFromPropertyRelationship', function(
    modulePath: string,
): string | null
{
    return getModuleNameFromPropertyRelationship(
        modulePath,
    );
});
