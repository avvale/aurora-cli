import { GenerateCommandState } from '../../types';
import { FileManager, Prompter } from '../../utils';
import { GlobalState } from '../../store';
import { cliterConfig } from '../../config';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as shell from 'node:child_process';
import * as logSymbols from 'log-symbols';
import * as chalk from 'chalk';
import * as emoji from 'node-emoji';
import * as _ from 'lodash';

export const reviewOverwrites = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    // get existing origin files
    const originFiles = GlobalState.getValue('originFiles')
        .filter(
            (file: string) =>
                fs.existsSync(
                    path.join(
                        process.cwd(),
                        file,
                    ),
                ),
        );

    if (Array.isArray(originFiles) && originFiles.length > 0)
    {
        generateCommandState.command.log(`
********************************************
***              ATTENTION!              ***
********************************************`);
        generateCommandState.command.log('%s %s %s There are files that have not been overwritten because they were modified, the following origin files have been created.', logSymbols.warning, chalk.yellow.bold('WARNING'), emoji.get('small_red_triangle'));

        for (const originFile of originFiles)
        {
            generateCommandState.command.log(`%s ${originFile}`, emoji.get('question'));
        }

        let deleteOriginFiles = true;
        let fileToManage: string | undefined = '';
        let actionResponse = '';

        // request if you want compare files
        if ((await Prompter.promptManageOriginFiles()).hasCompareOriginFile)
        {
            // list all origin files, and select file to manage
            fileToManage = (await Prompter.promptSelectOriginFileToManage(originFiles)).fileToManage as string;
            shell.exec(`code --diff ${fileToManage} ${fileToManage.replace('.origin', '')}`, (error, stdout, stderr) => { /**/ });

            while (actionResponse !== cliterConfig.compareActions.finish)
            {
                if (originFiles.length > 0)
                {
                    // eslint-disable-next-line no-await-in-loop
                    actionResponse = (await Prompter.promptSelectManagementAction()).compareAction as string;

                    switch (actionResponse)
                    {
                        case cliterConfig.compareActions.deleteOrigin:
                            fs.unlinkSync(fileToManage as string);                // delete origin file and reference in array, view state.service.ts file
                            fileToManage = _.head([...originFiles]); // get next file
                            if (fileToManage) shell.exec(`code --diff ${fileToManage} ${fileToManage.replace('.origin', '')}`, (error, stdout, stderr) => { /**/ });
                            break;

                        case cliterConfig.compareActions.return:
                            fileToManage = (await Prompter.promptSelectOriginFileToManage(originFiles)).fileToManage as string;
                            shell.exec(`code --diff ${fileToManage} ${fileToManage.replace('.origin', '')}`, (error, stdout, stderr) => { /**/ });
                            break;

                        case cliterConfig.compareActions.ignore:
                            if (!fileToManage) break;
                            const customFile = fs.readFileSync(fileToManage.replace('.origin', ''), 'utf8');
                            fs.writeFileSync(fileToManage.replace('.origin', ''), (fileToManage.endsWith('.origin.graphql') ? '# ignored file\r\n' : (fileToManage.endsWith('.origin.html') ? '<!-- ignored file -->\r\n' : '// ignored file\r\n')) + customFile, 'utf8');
                            fs.unlinkSync(fileToManage as string);                // delete origin file and reference in array, view state.service.ts file
                            fileToManage = _.head([...originFiles]); // get next file
                            if (fileToManage) shell.exec(`code --diff ${fileToManage} ${fileToManage.replace('.origin', '')}`, (error, stdout, stderr) => { /**/ });
                            break;
                    }
                }
                else
                {
                    generateCommandState.command.log('[INFO] All files have been reviewed');
                    deleteOriginFiles = false;
                    break;
                }
            }
        }

        if (deleteOriginFiles)
        {
            FileManager.deleteOriginFiles(process.cwd());
            generateCommandState.command.log(chalk.redBright.bold('[INFO] Origin files deleted!'));
        }
    }
};
