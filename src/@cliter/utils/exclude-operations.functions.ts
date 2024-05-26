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
