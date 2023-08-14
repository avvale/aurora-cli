import * as handlebars from 'handlebars';
import { getVariableNameAdditionalApi } from '../..';
import { AdditionalApi } from '../../utils/additional-api';

handlebars.registerHelper('getVariableNameAdditionalApi', function(
    additionalApi: AdditionalApi,
): string
{
    return getVariableNameAdditionalApi(additionalApi);
});
