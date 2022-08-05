import * as handlebars from 'handlebars';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

handlebars.registerHelper('uuid', function(value?: string)
{
    if (typeof value !== 'string') return uuidv4();

    const namespace = '0e1f290d-6a75-4e4b-8c51-48024ef919c5';
    return uuidv5(value, namespace);
});
