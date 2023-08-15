import * as handlebars from 'handlebars';
import { getMutationsAdditionalApis } from '../..';
import { AdditionalApi } from '../../utils/additional-api';

handlebars.registerHelper('getMutationsAdditionalApis', function(
    additionalApis: AdditionalApi[],
): AdditionalApi[]
{
    return getMutationsAdditionalApis(additionalApis);
});
