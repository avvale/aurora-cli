import * as handlebars from 'handlebars';
import { AdditionalApi, getAdditionalApiQueries } from '../..';

handlebars.registerHelper('getAdditionalApiQueries', function(
    additionalApis: AdditionalApi[],
): AdditionalApi[]
{
    return getAdditionalApiQueries(
        additionalApis,
    );
});
