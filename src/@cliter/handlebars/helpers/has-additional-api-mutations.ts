import * as handlebars from 'handlebars';
import { AdditionalApi, hasAdditionalApiMutations } from '../..';

handlebars.registerHelper('hasAdditionalApiMutations', function(
    additionalApis: AdditionalApi[],
): boolean
{
    return hasAdditionalApiMutations(
        additionalApis,
    );
});
