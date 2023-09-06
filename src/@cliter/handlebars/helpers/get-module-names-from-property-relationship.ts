import * as handlebars from 'handlebars';
import { getModuleNamesFromPropertyRelationship } from '../..';

handlebars.registerHelper('getModuleNamesFromPropertyRelationship', function(
    modulePath: string,
): string | null
{
    return getModuleNamesFromPropertyRelationship(
        modulePath,
    );
});
