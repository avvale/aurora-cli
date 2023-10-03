import * as handlebars from 'handlebars';
import { AdditionalApi, countAdditionalApiQueries } from '../..';

handlebars.registerHelper('countAdditionalApiQueries', function(
    additionalApis: AdditionalApi[],
): number
{
    return countAdditionalApiQueries(
        additionalApis,
    );
});
