import * as handlebars from 'handlebars';
import * as _ from 'lodash';

handlebars.registerHelper('isI18nRelationProperty', function(this: any, module, ...options)
{
    let property = '';
    let condition;
    for (const option of options)
    {
        if (typeof option === 'string')
        {
            property = option;
        }
        else
        {
            condition = option;
        }
    }

    if (property === _.camelCase(module) + 'Id') return condition.fn(this);
    return condition.inverse(this);
});