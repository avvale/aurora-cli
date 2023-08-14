import * as handlebars from 'handlebars';
import { getQueriesAdditionalApis } from '../..';
import { AdditionalApi } from '../../utils/additional-api';

handlebars.registerHelper('getQueriesAdditionalApis', function(
    additionalApis: AdditionalApi[],
): AdditionalApi[]
{
    return getQueriesAdditionalApis(additionalApis);
});
