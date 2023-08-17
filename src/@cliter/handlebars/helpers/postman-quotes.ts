import * as handlebars from 'handlebars';
import { cliterConfig } from '../../../@cliter/config/cliter.config';
import { Property } from '../../types';

handlebars.registerHelper('postmanQuotes', function(property: Property)
{
    return cliterConfig.quotationTypes[property.type] ? '\\\"' : '';
});
