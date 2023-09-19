import * as handlebars from 'handlebars';
import { AdditionalApi, countAdditionalApisQueries } from '../..';

handlebars.registerHelper('countAdditionalApisQueries', function(
    additionalApis: AdditionalApi[],
): number
{
    return countAdditionalApisQueries(
        additionalApis,
    );
});
