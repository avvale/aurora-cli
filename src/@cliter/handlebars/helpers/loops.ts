import * as handlebars from 'handlebars';

/****************************************************************
 *
 * {{#loops 10}}
 *   <span> {{@first}} {{@index}} {{@last}}</span>
 * {{/times}}
 *
 ****************************************************************/

handlebars.registerHelper('loops', function(n, options)
{
    let accumulator = '';
    for(let i = 0; i < n; ++i)
    {
        options.data.index = i;
        options.data.first = i === 0;
        options.data.last = i === (n - 1);
        accumulator += options.fn(n);
    }
    return accumulator;
});
