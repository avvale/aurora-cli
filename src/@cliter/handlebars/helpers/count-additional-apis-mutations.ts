import * as handlebars from 'handlebars';
import { AdditionalApi, countAdditionalApisMutations } from '../..';

handlebars.registerHelper('countAdditionalApisMutations', function(
    additionalApis: AdditionalApi[],
): number
{
    return countAdditionalApisMutations(
        additionalApis,
    );
});
