import * as handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';

handlebars.registerHelper('uuid', function()
{
    return uuidv4();
});
