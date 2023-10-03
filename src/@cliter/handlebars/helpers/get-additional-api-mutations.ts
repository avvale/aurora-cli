import * as handlebars from 'handlebars';
import { AdditionalApi, getAdditionalApiMutations } from '../..';

handlebars.registerHelper('getAdditionalApiMutations', function(
    additionalApis: AdditionalApi[],
): AdditionalApi[]
{
    return getAdditionalApiMutations(
        additionalApis,
    );
});
