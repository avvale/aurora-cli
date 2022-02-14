import * as handlebars from 'handlebars';

handlebars.registerHelper('notInArray', function(this: any, items, ...options)
{
    let file = '';
    let condition;
    for (const option of options)
    {
        if (typeof option === 'string')
        {
            file += option;
        }
        else
        {
            condition = option;
        }
    }

    if (!Array.isArray(items) || !items.includes(file)) return condition.fn(this);
});
