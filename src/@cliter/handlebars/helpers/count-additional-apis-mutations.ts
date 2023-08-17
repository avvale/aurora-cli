import * as handlebars from 'handlebars';
import { countAdditionalApisMutations } from '../..';
import { AdditionalApi } from '../../utils/additional-api';

handlebars.registerHelper('countAdditionalApisMutations', function(
    additionalApis: AdditionalApi[],
): number
{
    return countAdditionalApisMutations(
        additionalApis,
    );
});
