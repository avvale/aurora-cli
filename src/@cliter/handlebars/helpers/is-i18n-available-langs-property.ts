import { Property, getNameProperty, hasI18nProperties } from '../..';
import * as handlebars from 'handlebars';

handlebars.registerHelper('isI18nAvailableLangsProperty', function(property: Property, properties: Property[])
{
    return hasI18nProperties(properties) && getNameProperty(property) === 'availableLangs';
});
