import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, excludeOperations } from '../..';

handlebars.registerHelper('isAllowOperationsPath', function(
    schema: ModuleDefinitionSchema,
    operation: string,
    path: string,
): boolean
{
    if (!Array.isArray(schema.excludedOperations)) return true;
    return excludeOperations(
        schema.excludedOperations,
        schema.boundedContextName,
        schema.moduleName,
        schema.moduleNames,
        operation,
    ).isAllowPath(path);
});
