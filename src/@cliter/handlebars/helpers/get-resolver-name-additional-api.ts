import * as handlebars from 'handlebars';
import { AdditionalApi, getResolverNameAdditionalApi } from '../..';

handlebars.registerHelper('getResolverNameAdditionalApi', function(
    additionalApi: AdditionalApi,
): string
{
    return getResolverNameAdditionalApi(
        additionalApi,
    );
});
