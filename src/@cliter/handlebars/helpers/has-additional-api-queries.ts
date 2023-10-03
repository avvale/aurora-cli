import * as handlebars from 'handlebars';
import { AdditionalApi, hasAdditionalApiQueries } from '../..';

handlebars.registerHelper('hasAdditionalApiQueries', function(
    additionalApis: AdditionalApi[],
): boolean
{
    return hasAdditionalApiQueries(
        additionalApis,
    );
});
