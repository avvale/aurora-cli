import * as fs from 'node:fs';
import * as shell from 'node:child_process';
import * as logSymbols from 'log-symbols';
import * as chalk from 'chalk';
import * as emoji from 'node-emoji';
import * as _ from 'lodash';
import { Operations, TemplateElement, Prompter, ModuleDefinitionSchema, FileManager, YamlManager, BackHandler, GenerateCommandState, cliterConfig } from '../../@cliter/index';
import { Command, Flags } from '@oclif/core';
import { generateGraphqlTypes } from '../../@cliter/functions/back';
import { FrontHandler } from '../../@cliter/handlers/front.handler';
import { loadJsonLockFile } from '../../@cliter/functions/common';

export default class Load extends Command
{
    static description = 'Reload aurora [bounded-context, module] from yaml file, located in the cliter folder';

    static flags =
    {
        boundedContext    : Flags.string({ char: 'b' }),
        dashboard         : Flags.boolean({ char: 'd' }),
        force             : Flags.boolean({ char: 'f' }),
        help              : Flags.help({ char: 'h' }),
        module            : Flags.string({ char: 'm' }),
        noGraphQLTypes    : Flags.boolean({ char: 'g' }),
        overwriteInterface: Flags.boolean({ char: 'w' }),
        tests             : Flags.boolean({ char: 't' }),
        verbose           : Flags.boolean({ char: 'v' }),
    };

    static args = [
        {
            name       : 'elementType',
            description: 'Type element to create',
            options    : [
                'bounded-context',
                'b',
                'module',
                'm',
            ],
            required: true,
        },
    ];

    async run(): Promise<void>
    {
        const { args, flags }   = await this.parse(Load);

        if (args.elementType === 'b') args.elementType = TemplateElement.BACK_BOUNDED_CONTEXT;
        if (args.elementType === 'm') args.elementType = TemplateElement.BACK_MODULE;

        if (args.elementType === TemplateElement.BACK_MODULE)
        {
            let moduleFlag: any = {};
            if (flags.module) moduleFlag = Operations.parseFlagOfBoundedContextAndModule(this, flags.module);

            const { boundedContextName, moduleName }: any = await Prompter.promptForLoadModule(moduleFlag?.boundedContextName, moduleFlag?.moduleName);

            // create yaml file
            const schema: ModuleDefinitionSchema = YamlManager.loadYamlConfigFile(boundedContextName, moduleName);

            // define state like a generate command
            let generateCommandState;

            // eslint-disable-next-line unicorn/prefer-ternary
            if (flags.dashboard)
            {
                generateCommandState = {
                    command: this,
                    flags  : {
                        ...flags,
                        // avoid generate graphql types in front, it is not necessary
                        noGraphQLTypes: true,
                    },
                    lockFiles: loadJsonLockFile(boundedContextName, moduleName),
                    schema,
                };
                await FrontHandler.generateModule(generateCommandState);
            }
            else
            {
                generateCommandState = {
                    command  : this,
                    flags,
                    lockFiles: loadJsonLockFile(boundedContextName, moduleName),
                    schema,
                };
                await BackHandler.generateModule(generateCommandState);
            }

            await this.reviewOverwrites(generateCommandState);
        }

        /* if (args.elementType === TemplateElement.BACK_BOUNDED_CONTEXT)
        {
            const { boundedContextName }: any = await Prompter.promptForLoadBoundedContext(flags.boundedContext);

            const yamlFiles = fs.readdirSync(path.join(process.cwd(), 'cliter', boundedContextName.toKebabCase()));

            const batchOperations = [];
            for (const yamlFile of yamlFiles.filter(files => files.endsWith('.yaml')))
            {
                // create yaml file
                const schema: ModuleDefinitionSchema    = YamlManager.loadYamlConfigFile(boundedContextName, yamlFile.replace('.yaml', ''));
                const currentLockFiles: LockFile[]      = this.loadJsonLockFile(boundedContextName, schema.moduleName);

                // set stateService
                stateService.command   = this;
                stateService.schema    = schema;
                stateService.lockFiles = currentLockFiles;
                stateService.flags     = flags;

                // generate module files
                batchOperations.push(BackHandler.generateModule());
            }

            await Promise.all(batchOperations);

            // generate graphql files
            await this.reviewOverwrites(stateService);
        } */
    }

    private async reviewOverwrites(generateCommandState: GenerateCommandState)
    {
        if (!generateCommandState.flags.noGraphQLTypes)
        {
            // generate graphql files
            await generateGraphqlTypes(generateCommandState);
        }

        if (stateService.originFiles.length > 0)
        {
            generateCommandState.command.log(`
********************************************
***              ATTENTION!              ***
********************************************`);
            generateCommandState.command.log('%s %s %s There are files that have not been overwritten because they were modified, the following origin files have been created.', logSymbols.warning, chalk.yellow.bold('WARNING'), emoji.get('small_red_triangle'));

            for (const originFile of stateService.originFiles)
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
                fileToManage = (await Prompter.promptSelectOriginFileToManage(stateService.originFiles)).fileToManage as string;
                shell.exec(`code --diff ${fileToManage} ${fileToManage.replace('.origin', '')}`, (error, stdout, stderr) => { /**/ });

                while (actionResponse !== cliterConfig.compareActions.finish)
                {
                    if (stateService.originFiles.length > 0)
                    {
                        actionResponse = (await Prompter.promptSelectManagementAction()).compareAction as string;

                        switch (actionResponse)
                        {
                            case cliterConfig.compareActions.deleteOrigin:
                                fs.unlinkSync(fileToManage as string);                     // delete origin file and reference in array, view state.service.ts file
                                fileToManage = _.head([...stateService.originFiles]);   // get next file
                                if (fileToManage) shell.exec(`code --diff ${fileToManage} ${fileToManage.replace('.origin', '')}`, (error, stdout, stderr) => { /**/ });
                                break;

                            case cliterConfig.compareActions.return:
                                fileToManage = (await Prompter.promptSelectOriginFileToManage(stateService.originFiles)).fileToManage as string;
                                shell.exec(`code --diff ${fileToManage} ${fileToManage.replace('.origin', '')}`, (error, stdout, stderr) => { /**/ });
                                break;

                            case cliterConfig.compareActions.ignore:
                                if (!fileToManage) break;
                                const customFile = fs.readFileSync(fileToManage.replace('.origin', ''), 'utf8');
                                fs.writeFileSync(fileToManage.replace('.origin', ''), (fileToManage.endsWith('.origin.graphql') ? '# ignored file\r\n' : (fileToManage.endsWith('.origin.html') ? '<!-- ignored file -->\r\n' : '// ignored file\r\n')) + customFile, 'utf8');
                                fs.unlinkSync(fileToManage as string); // delete origin file and reference in array, view state.service.ts file
                                fileToManage = _.head([...stateService.originFiles]);   // get next file
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
    }
}
