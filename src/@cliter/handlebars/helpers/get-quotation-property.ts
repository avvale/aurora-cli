import * as handlebars from 'handlebars';
import { CliterConfig, Property, hasQuotationProperty } from '../..';

handlebars.registerHelper('hasQuotationProperty', function(
    property: Property,
    config: CliterConfig,
): boolean
{
    return hasQuotationProperty(
        property,
        config,
    );
});
