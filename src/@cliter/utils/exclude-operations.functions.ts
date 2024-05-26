export const excludeOperations = (operationsToExclude: string[]): ExcludeOperations => new ExcludeOperations(operationsToExclude);
const operationsPaths: { [key: string]: Set<string> } =
{
    count: new Set([
        'src/@app/iam/tag/application/count',
        'src/@app/iam/tag/application/count/iam-count-tag.query-handler.spec.ts',
        'src/@app/iam/tag/application/count/iam-count-tag.query-handler.ts',
        'src/@app/iam/tag/application/count/iam-count-tag.query.ts',
        'src/@app/iam/tag/application/count/iam-count-tag.service.spec.ts',
        'src/@app/iam/tag/application/count/iam-count-tag.service.ts',
    ]),
};

class ExcludeOperations
{
    private operationsToExclude: Set<string>;

    constructor(operationsToExclude: string[])
    {
        this.operationsToExclude = new Set(operationsToExclude);
    }

    isAllowPath(path: string): boolean
    {
        for (const operation of this.operationsToExclude)
        {
            if (operationsPaths[operation].has(path)) return false;
        }

        return true;
    }
}
