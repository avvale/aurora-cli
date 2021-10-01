import * as handlebars from 'handlebars';
import { fakerHelper, getFakerHelperParams } from './common-functions';

handlebars.registerHelper('faker', function(command: string, ...options)
{
    return fakerHelper(command, getFakerHelperParams(options));
});