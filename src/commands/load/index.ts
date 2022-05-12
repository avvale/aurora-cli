// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// node
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as shell from 'node:child_process';

// imports
import { Command, Flags } from '@oclif/core';
import * as logSymbols from 'log-symbols';
import * as chalk from 'chalk';
import * as emoji from 'node-emoji';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';
import { YamlManager } from '../../@cliter/utils';
import { StateService, Operations, TemplateElement, Prompter, ModuleDefinitionSchema, LockFile, Properties, Property, FileManager } from '../../@cliter';

export default class Load extends Command
{
    static description = 'Reload aurora [bounded-context, module] from yaml file, located in the cliter folder';

    static flags =
    {
        help              : Flags.help({ char: 'h' }),
        verbose           : Flags.boolean({ char: 'v' }),
        force             : Flags.boolean({ char: 'f' }),
        module            : Flags.string({ char: 'm' }),
        boundedContext    : Flags.string({ char: 'b' }),
        tests             : Flags.boolean({ char: 't' }),
        noGraphQLTypes    : Flags.boolean({ char: 'g' }),
        dashboard         : Flags.boolean({ char: 'd' }),
        overwriteInterface: Flags.boolean({ char: 'w' }),
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
        const stateService      = container.resolve(StateService);

        if (args.elementType === 'b') args.elementType = TemplateElement.BACK_BOUNDED_CONTEXT;
        if (args.elementType === 'm') args.elementType = TemplateElement.BACK_MODULE;

        // set operations object
        const operations = new Operations();

        if (args.elementType === TemplateElement.BACK_MODULE)
        {
            let moduleFlag: any = {};
            if (flags.module) moduleFlag = Operations.parseFlagOfBoundedContextAndModule(this, flags.module);

            const { boundedContextName, moduleName }: any = await Prompter.promptForLoadModule(moduleFlag?.boundedContextName, moduleFlag?.moduleName);

            // create yaml file
            const schema: ModuleDefinitionSchema    = YamlManager.loadYamlConfigFile(boundedContextName, moduleName);
            const currentLockFiles: LockFile[]      = this.loadJsonLockFile(boundedContextName, moduleName);

            // set stateService
            stateService.command   = this;
            stateService.schema    = schema;
            stateService.lockFiles = currentLockFiles;
            stateService.flags     = flags;

            if (flags.dashboard)
            {
                await operations.generateFrontModule();

                // TODO reorganizar los flows para evitar esta ñapa, para evitar generar graphql types en el dashboard
                stateService.flags.noGraphQLTypes = true;
            }
            else
            {
                await operations.generateBackModule();
            }

            await this.reviewOverwrites(operations, stateService);
        }

        if (args.elementType === TemplateElement.BACK_BOUNDED_CONTEXT)
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
                batchOperations.push(operations.generateBackModule());
            }

            await Promise.all(batchOperations);

            // generate graphql files
            await this.reviewOverwrites(operations, stateService);
        }
    }

    private async reviewOverwrites(operations: Operations, stateService: StateService)
    {
        if (!stateService.flags.noGraphQLTypes)
        {
            // generate graphql files
            await operations.generateGraphqlTypes();
        }

        if (stateService.originFiles.length > 0)
        {
            stateService.command.log(`
********************************************
***              ATTENTION!              ***
********************************************`);
            stateService.command.log('%s %s %s There are files that have not been overwritten because they were modified, the following origin files have been created.', logSymbols.warning, chalk.yellow.bold('WARNING'), emoji.get('small_red_triangle'));

            for (const originFile of stateService.originFiles)
            {
                stateService.command.log(`%s ${originFile}`, emoji.get('question'));
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

                while (actionResponse !== stateService.config.compareActions.finish)
                {
                    if (stateService.originFiles.length > 0)
                    {
                        actionResponse = (await Prompter.promptSelectManagementAction()).compareAction as string;

                        switch (actionResponse)
                        {
                            case stateService.config.compareActions.deleteOrigin:
                                fs.unlinkSync(fileToManage as string);                     // delete origin file and reference in array, view state.service.ts file
                                fileToManage = _.head([...stateService.originFiles]);   // get next file
                                if (fileToManage) shell.exec(`code --diff ${fileToManage} ${fileToManage.replace('.origin', '')}`, (error, stdout, stderr) => { /**/ });
                                break;

                            case stateService.config.compareActions.return:
                                fileToManage = (await Prompter.promptSelectOriginFileToManage(stateService.originFiles)).fileToManage as string;
                                shell.exec(`code --diff ${fileToManage} ${fileToManage.replace('.origin', '')}`, (error, stdout, stderr) => { /**/ });
                                break;

                            case stateService.config.compareActions.ignore:
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
                        stateService.command.log('[INFO] All files have been reviewed');
                        deleteOriginFiles = false;
                        break;
                    }
                }
            }

            if (deleteOriginFiles)
            {
                FileManager.deleteOriginFiles(process.cwd());
                stateService.command.log(chalk.redBright.bold('[INFO] Origin files deleted!'));
            }
        }
    }

    private loadJsonLockFile(boundedContextName: string, moduleName: string): LockFile[]
    {
        const jsonPath = path.join(process.cwd(), 'cliter', boundedContextName.toKebabCase(), moduleName.toKebabCase() + '-lock.json');

        if (!fs.existsSync(jsonPath)) return [];

        return (JSON.parse(fs.readFileSync(jsonPath, 'utf8')).files) as LockFile[];
    }
}
