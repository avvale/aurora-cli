import * as handlebars from 'handlebars';
import { AdditionalApi, countAdditionalApiMutations } from '../..';

handlebars.registerHelper('countAdditionalApiMutations', function(
    additionalApis: AdditionalApi[],
): number
{
    return countAdditionalApiMutations(
        additionalApis,
    );
});
