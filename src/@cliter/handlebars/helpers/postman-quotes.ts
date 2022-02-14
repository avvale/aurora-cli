import * as handlebars from 'handlebars';
import { Property } from './../../utils/property';
import { cliterConfig } from '../../../@cliter/config/cliter.config';

handlebars.registerHelper('postmanQuotes', function(property: Property)
{
    return cliterConfig.quotationTypes[property.type] ? '\\\"' : '';
});
