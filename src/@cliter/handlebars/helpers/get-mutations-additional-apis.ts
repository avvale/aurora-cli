import * as handlebars from 'handlebars';
import { AdditionalApi, getMutationsAdditionalApis } from '../..';

handlebars.registerHelper('getMutationsAdditionalApis', function(
    additionalApis: AdditionalApi[],
): AdditionalApi[]
{
    return getMutationsAdditionalApis(
        additionalApis,
    );
});
