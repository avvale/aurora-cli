import * as handlebars from 'handlebars';
import { Property } from './../../utils/property';
import * as _ from 'lodash';

handlebars.registerHelper('fakerPostman', function(property: Property, ...options)
{
    return property.fakerPostman();
});