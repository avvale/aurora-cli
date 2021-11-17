import * as handlebars from 'handlebars';
import * as _ from 'lodash';

handlebars.registerHelper('allowI18nProperty', function(this: any, module, ...options)
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

    if (
        property !== 'id'
        && property !== _.camelCase(module) + 'Id'
        && property !== 'createdAt'
        && property !== 'updatedAt'
        && property !== 'deletedAt'
    ) return condition.fn(this);
});