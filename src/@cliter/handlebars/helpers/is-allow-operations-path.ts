import * as handlebars from 'handlebars';
import { excludeOperations } from '../..';

handlebars.registerHelper('isAllowOperationsPath', function(
    operationsToExclude: string[],
    path: string,
): boolean
{
    return excludeOperations(operationsToExclude).isAllowPath(path);
});
