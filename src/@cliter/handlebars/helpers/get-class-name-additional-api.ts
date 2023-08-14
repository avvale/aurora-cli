import * as handlebars from 'handlebars';
import { getClassNameAdditionalApi } from '../..';
import { AdditionalApi } from '../../utils/additional-api';

handlebars.registerHelper('getClassNameAdditionalApi', function(
    additionalApi: AdditionalApi,
): string
{
    return getClassNameAdditionalApi(additionalApi);
});
