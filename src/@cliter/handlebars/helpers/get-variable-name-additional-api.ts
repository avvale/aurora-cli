import * as handlebars from 'handlebars';
import { AdditionalApi, getVariableNameAdditionalApi } from '../..';

handlebars.registerHelper('getVariableNameAdditionalApi', function(
    additionalApi: AdditionalApi,
): string
{
    return getVariableNameAdditionalApi(
        additionalApi,
    );
});
