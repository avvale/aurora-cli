import * as handlebars from 'handlebars';
import { getResolverNameAdditionalApi } from '../..';
import { AdditionalApi } from '../../utils/additional-api';

handlebars.registerHelper('getResolverNameAdditionalApi', function(
    additionalApi: AdditionalApi,
): string
{
    return getResolverNameAdditionalApi(additionalApi);
});
