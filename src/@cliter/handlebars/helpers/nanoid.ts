import * as handlebars from 'handlebars';
import { nanoid } from 'nanoid'

handlebars.registerHelper('nanoid', function()
{
    return nanoid();
});