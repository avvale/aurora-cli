import * as handlebars from 'handlebars';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

handlebars.registerHelper('uuid', function(...values: any[])
{
    if (!Array.isArray(values)) return uuidv4();

    const namespace = '0e1f290d-6a75-4e4b-8c51-48024ef919c5';
    return uuidv5(values.join(''), namespace);
});
