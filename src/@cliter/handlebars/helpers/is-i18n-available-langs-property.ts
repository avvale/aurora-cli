import { Property, Properties } from '../..';
import * as handlebars from 'handlebars';
import * as _ from 'lodash';

handlebars.registerHelper('isI18nAvailableLangsProperty', function(property: Property, properties: Properties)
{
    return properties.hasI18n && property.name === 'availableLangs';
});
