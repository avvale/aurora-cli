import * as handlebars from 'handlebars';
import * as path from 'node:path';
import { ModuleDefinitionSchema } from '../..';

handlebars.registerHelper('getModulePathFromSchema', function(
    schema: ModuleDefinitionSchema,
): string | null
{
    return schema.boundedContextName + path.sep + schema.moduleName;
});
