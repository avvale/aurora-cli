import * as handlebars from 'handlebars';
import { getBoundedContextNameFromPropertyRelationship } from '../..';

handlebars.registerHelper('getBoundedContextNameFromPropertyRelationship', function(
    modulePath: string,
): string | null
{
    return getBoundedContextNameFromPropertyRelationship(
        modulePath,
    );
});
