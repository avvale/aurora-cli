import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, excludeFiles, excludeOperations } from '../..';
import * as path from 'node:path';

handlebars.registerHelper(
    'isAllowPath',
    function(
        this: any,
        schema: ModuleDefinitionSchema,
        operation: string,
        ...params
    )
    {
        const paths: string[] = [];
        let condition;
        for (const param of params)
        {
            if (typeof param === 'string')
            {
                paths.push(param);
            }
            else
            {
                condition = param;
            }
        }

        if (
            (Array.isArray(schema.excludedOperations) ?
                excludeOperations(
                    schema.excludedOperations,
                    schema.boundedContextName,
                    schema.moduleName,
                    schema.moduleNames,
                    operation,
                ).isAllowPath(path.join(...paths)) : true) &&
            (Array.isArray(schema.excludedFiles) ?
                excludeFiles(schema.excludedFiles).isAllowPath(path.join(...paths)) : true)
        )
            return condition.fn(this);
    },
);
