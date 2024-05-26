export const excludeFiles = (filesToExclude: string[]): ExcludeFiles => new ExcludeFiles(filesToExclude);

class ExcludeFiles
{
    private filesToExclude: Set<string>;

    constructor(filesToExclude: string[])
    {
        this.filesToExclude = new Set(filesToExclude);
    }

    isAllowPath(path: string): boolean
    {
        return !this.filesToExclude.has(path);
    }
}
