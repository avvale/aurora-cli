import * as handlebars from 'handlebars';
import { countAdditionalApisQueries } from '../..';
import { AdditionalApi } from '../../utils/additional-api';

handlebars.registerHelper('countAdditionalApisQueries', function(
    additionalApis: AdditionalApi[],
): number
{
    return countAdditionalApisQueries(
        additionalApis,
    );
});
