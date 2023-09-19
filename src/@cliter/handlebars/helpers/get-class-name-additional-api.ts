import * as handlebars from 'handlebars';
import { AdditionalApi, getClassNameAdditionalApi } from '../..';

handlebars.registerHelper('getClassNameAdditionalApi', function(
    additionalApi: AdditionalApi,
): string
{
    return getClassNameAdditionalApi(
        additionalApi,
    );
});
