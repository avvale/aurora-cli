import * as handlebars from 'handlebars';
import { excludeFiles } from '../..';

handlebars.registerHelper('isAllowFilesPath', function(
    filesToExclude: string[],
    path: string,
): boolean
{
    return excludeFiles(filesToExclude).isAllowPath(path);
});
