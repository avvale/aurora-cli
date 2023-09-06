import * as handlebars from 'handlebars';
import { getAggregateNameFromPropertyRelationship } from '../..';

handlebars.registerHelper('getAggregateNameFromPropertyRelationship', function(
    modulePath: string,
): string | null
{
    return getAggregateNameFromPropertyRelationship(
        modulePath,
    );
});
