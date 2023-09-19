import * as handlebars from 'handlebars';
import { AdditionalApi, getQueriesAdditionalApis } from '../..';

handlebars.registerHelper('getQueriesAdditionalApis', function(
    additionalApis: AdditionalApi[],
): AdditionalApi[]
{
    return getQueriesAdditionalApis(
        additionalApis,
    );
});
