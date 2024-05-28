import * as path from 'node:path';

export const excludeOperations = (
    operationsToExclude: string[],
    boundedContextName: string,
    moduleName: string,
    moduleNames: string,
    operation?: string,
): ExcludeOperations => new ExcludeOperations(
    operationsToExclude,
    boundedContextName,
    moduleName,
    moduleNames,
    operation,
);

class ExcludeOperations
{
    private operation?: string;
    private operationsToExclude: Set<string>;
    private operationsPatternPaths: { [key: string]: Set<string[]> } =
    {
        upsert: new Set([
            ['src', '@api', '__bounded_context_name__', '__module_name__', 'controllers', '__bounded_context_name__-upsert-__module_name__.controller.spec.ts'],
            ['src', '@api', '__bounded_context_name__', '__module_name__', 'controllers', '__bounded_context_name__-upsert-__module_name__.controller.ts'],
            ['src', '@api', '__bounded_context_name__', '__module_name__', 'handlers', '__bounded_context_name__-upsert-__module_name__.handler.spec.ts'],
            ['src', '@api', '__bounded_context_name__', '__module_name__', 'handlers', '__bounded_context_name__-upsert-__module_name__.handler.ts'],
            ['src', '@api', '__bounded_context_name__', '__module_name__', 'resolvers', '__bounded_context_name__-upsert-__module_name__.resolver.spec.ts'],
            ['src', '@api', '__bounded_context_name__', '__module_name__', 'resolvers', '__bounded_context_name__-upsert-__module_name__.resolver.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'upsert'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'upsert', '__bounded_context_name__-upsert-__module_name__.command-handler.spec.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'upsert', '__bounded_context_name__-upsert-__module_name__.command-handler.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'upsert', '__bounded_context_name__-upsert-__module_name__.command.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'upsert', '__bounded_context_name__-upsert-__module_name__.service.spec.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'upsert', '__bounded_context_name__-upsert-__module_name__.service.ts'],
        ]),
        count: new Set([
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'count'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'count', '__bounded_context_name__-count-__module_name__.query-handler.spec.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'count', '__bounded_context_name__-count-__module_name__.query-handler.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'count', '__bounded_context_name__-count-__module_name__.query.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'count', '__bounded_context_name__-count-__module_name__.service.spec.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'count', '__bounded_context_name__-count-__module_name__.service.ts'],
        ]),
        max: new Set([
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'max'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'max', '__bounded_context_name__-max-__module_name__.query-handler.spec.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'max', '__bounded_context_name__-max-__module_name__.query-handler.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'max', '__bounded_context_name__-max-__module_name__.query.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'max', '__bounded_context_name__-max-__module_name__.service.spec.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'max', '__bounded_context_name__-max-__module_name__.service.ts'],
        ]),
        min: new Set([
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'min'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'min', '__bounded_context_name__-min-__module_name__.query-handler.spec.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'min', '__bounded_context_name__-min-__module_name__.query-handler.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'min', '__bounded_context_name__-min-__module_name__.query.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'min', '__bounded_context_name__-min-__module_name__.service.spec.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'min', '__bounded_context_name__-min-__module_name__.service.ts'],
        ]),
        sum: new Set([
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'sum'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'sum', '__bounded_context_name__-sum-__module_name__.query-handler.spec.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'sum', '__bounded_context_name__-sum-__module_name__.query-handler.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'sum', '__bounded_context_name__-sum-__module_name__.query.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'sum', '__bounded_context_name__-sum-__module_name__.service.spec.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'sum', '__bounded_context_name__-sum-__module_name__.service.ts'],
        ]),
        rawSql: new Set([
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'raw-sql'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'raw-sql', '__bounded_context_name__-raw-sql-__module_names__.query-handler.spec.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'raw-sql', '__bounded_context_name__-raw-sql-__module_names__.query-handler.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'raw-sql', '__bounded_context_name__-raw-sql-__module_names__.query.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'raw-sql', '__bounded_context_name__-raw-sql-__module_names__.service.spec.ts'],
            ['src', '@app', '__bounded_context_name__', '__module_name__', 'application', 'raw-sql', '__bounded_context_name__-raw-sql-__module_names__.service.ts'],
        ]),
    };

    private operationsParsedPaths: { [key: string]: Set<string> } = {};

    // eslint-disable-next-line max-params
    constructor(
        operationsToExclude: string[],
        boundedContextName: string,
        moduleName: string,
        moduleNames: string,
        operation?: string,
    )
    {
        this.operation = operation;
        this.operationsToExclude = new Set(operationsToExclude);

        if (operation && Object.keys(this.operationsPatternPaths).includes(operation))
        {
            this.setOperationsParsedPaths(
                operation,
                this.operationsPatternPaths[operation],
                boundedContextName,
                moduleName,
                moduleNames,
            );
        }
        else
        {
            for (const [key, paths] of Object.entries(this.operationsPatternPaths))
            {
                this.setOperationsParsedPaths(
                    key,
                    paths,
                    boundedContextName,
                    moduleName,
                    moduleNames,
                );
            }
        }
    }

    isAllowPath(path: string): boolean
    {
        for (const operation of this.operationsToExclude)
        {
            if (this.operation && this.operation !== operation) continue;
            if (this.operationsParsedPaths[operation].has(path)) return false;
        }

        return true;
    }

    // eslint-disable-next-line max-params
    private setOperationsParsedPaths(
        operation: string,
        patternPathsItems: Set<string[]>,
        boundedContextName: string,
        moduleName: string,
        moduleNames: string,
    ): void
    {
        const parsedPaths = new Set<string>();
        for (const patternPathItems of patternPathsItems)
        {
            parsedPaths.add(
                path.join(
                    ...patternPathItems.map(
                        part => part
                            .replace(/__bounded_context_name__/g, boundedContextName)
                            .replace(/__module_name__/gi, moduleName)
                            .replace(/__module_names__/gi, moduleNames),
                    ),
                ),
            );
        }

        this.operationsParsedPaths[operation] = parsedPaths;
    }
}
