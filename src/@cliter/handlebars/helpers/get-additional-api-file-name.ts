import * as handlebars from 'handlebars';
import { AdditionalApi, getAdditionalApiFileName } from '../..';

handlebars.registerHelper('getAdditionalApiFileName', function(
    additionalApi: AdditionalApi,
): string
{
    return getAdditionalApiFileName(
        additionalApi,
    );
});
