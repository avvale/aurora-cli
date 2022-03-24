// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// imports
import { Command, Flags } from '@oclif/core';
import * as shell from 'child_process';
import * as logSymbols from 'log-symbols';
import * as chalk from 'chalk';
import * as emoji from 'node-emoji';
import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';
import { StateService, Operations, TemplateElement, Prompter, ModuleDefinitionSchema, LockFile, Properties, Property, FileManager } from '../../@cliter';

export default class Load extends Command
{
    static description = 'Reload aurora [bounded-context, module] from yaml file, located in the cliter folder';

    static flags =
    {
        help          : Flags.help({ char: 'h' }),
        verbose       : Flags.boolean({ char: 'v' }),
        force         : Flags.boolean({ char: 'f' }),
        module        : Flags.string({ char: 'm' }),
        boundedContext: Flags.string({ char: 'b' }),
        tests         : Flags.boolean({ char: 't' }),
        noGraphQLTypes: Flags.boolean({ char: 'g' }),
        dashboard     : Flags.boolean({ char: 'd' }),
    };

    static args = [
        {
            name       : 'elementType',
            description: 'Type element to create',
            options    : [
                'bounded-context', 'b',
                'module', 'm'
            ],
            required   : true,
        },
    ];

    async run(): Promise<void>
    {
        const { args, flags }   = await this.parse(Load);
        const stateService      = container.resolve(StateService);

        if (args.elementType === 'b') args.elementType = 'bounded-context';
        if (args.elementType === 'm') args.elementType = 'module';

        // ser operations object
        const operations = new Operations();

        if (args.elementType === TemplateElement.MODULE)
        {
            let moduleFlag: any = {};
            if (flags.module) moduleFlag = Operations.parseFlagOfBoundedContextAndModule(this, flags.module);

            const { boundedContextName, moduleName }: any = await Prompter.promptForLoadModule(moduleFlag?.boundedContextName, moduleFlag?.moduleName);

            // create yaml file
            const schema: ModuleDefinitionSchema    = this.loadYamlConfigFile(boundedContextName, moduleName);
            const currentLockFiles: LockFile[]      = this.loadJsonLockFile(boundedContextName, moduleName);

            // set stateService
            stateService.command   = this;
            stateService.schema    = schema;
            stateService.lockFiles = currentLockFiles;
            stateService.flags     = flags;

            if (flags.dashboard)
            {
                await operations.generateDashboardModule();

                // TODO reorganizar los flows para evitar esta ñapa, para evitar generar graphql types en el dashboard
                stateService.flags.noGraphQLTypes = true;
            }
            else
            {
                await operations.generateModule();
            }

            await this.reviewOverwrites(operations, stateService);
        }

        if (args.elementType.toSnakeCase() === TemplateElement.BOUNDED_CONTEXT)
        {
            const { boundedContextName }: any = await Prompter.promptForLoadBoundedContext(flags.boundedContext);

            const yamlFiles = fs.readdirSync(path.join(process.cwd(), 'cliter', boundedContextName.toKebabCase()));

            const batchOperations = [];
            for (const yamlFile of yamlFiles.filter(files => files.endsWith('.yaml')))
            {
                // create yaml file
                const schema: ModuleDefinitionSchema    = this.loadYamlConfigFile(boundedContextName, yamlFile.replace('.yaml', ''));
                const currentLockFiles: LockFile[]      = this.loadJsonLockFile(boundedContextName, schema.moduleName);

                // set stateService
                stateService.command   = this;
                stateService.schema    = schema;
                stateService.lockFiles = currentLockFiles;
                stateService.flags     = flags;

                // generate module files
                batchOperations.push(operations.generateModule());
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
                                fileToManage = _.head(stateService.originFiles.slice());   // get next file
                                if (fileToManage) shell.exec(`code --diff ${fileToManage} ${fileToManage.replace('.origin', '')}`, (error, stdout, stderr) => { /**/ });
                                break;

                            case stateService.config.compareActions.return:
                                fileToManage = (await Prompter.promptSelectOriginFileToManage(stateService.originFiles)).fileToManage as string;
                                shell.exec(`code --diff ${fileToManage} ${fileToManage.replace('.origin', '')}`, (error, stdout, stderr) => { /**/ });
                                break;

                            case stateService.config.compareActions.ignore:
                                if (!fileToManage) break;
                                    const customFile = fs.readFileSync(fileToManage.replace('.origin', ''), 'utf8');
                                    fs.writeFileSync(fileToManage.replace('.origin', ''), '// ignored file\r\n' + customFile, 'utf8');
                                    fs.unlinkSync(fileToManage as string); // delete origin file and reference in array, view state.service.ts file
                                    fileToManage = _.head(stateService.originFiles.slice());   // get next file
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

    private loadYamlConfigFile(boundedContextName: string, moduleName: string): ModuleDefinitionSchema
    {
        const yamlPath = path.join(process.cwd(), 'cliter', boundedContextName.toKebabCase(), moduleName.toKebabCase() + '.yaml');

        // read yaml file
        const yamlObj = yaml.load(fs.readFileSync(yamlPath, 'utf8')) as any;

        this.parseModuleDefinitionSchema(yamlObj);

        const properties        = new Properties();
        properties.moduleName   = yamlObj.moduleName;

        for (const property of yamlObj.aggregateProperties)
        {
            properties.add(
                new Property({
                    name                          : property.name,
                    type                          : property.type,
                    primaryKey                    : property?.primaryKey,
                    enumOptions                   : property?.enumOptions?.join(),
                    decimals                      : property?.decimals,
                    length                        : property?.length,
                    minLength                     : property?.minLength,
                    maxLength                     : property?.maxLength,
                    nullable                      : property?.nullable,
                    defaultValue                  : property?.defaultValue,
                    relationship                  : property?.relationship,
                    relationshipSingularName      : property?.relationshipSingularName,
                    relationshipAggregate         : property?.relationshipAggregate,
                    relationshipModulePath        : property?.relationshipModulePath,
                    relationshipKey               : property?.relationshipKey,
                    relationshipField             : property?.relationshipField,
                    relationshipAvoidConstraint   : property?.relationshipAvoidConstraint,
                    relationshipPackageName       : property?.relationshipPackageName,
                    intermediateTable             : property?.intermediateTable,
                    intermediateModel             : property?.intermediateModel,
                    intermediateModelModuleSection: property?.intermediateModelModuleSection,
                    intermediateModelFile         : property?.intermediateModelFile,
                    index                         : property?.index,
                    indexName                     : property?.indexName,
                    isI18n                        : property?.isI18n,
                    example                       : property?.example,
                    faker                         : property?.faker,
                }),
            );
        }

        return {
            boundedContextName: yamlObj.boundedContextName,
            moduleName        : yamlObj.moduleName,
            moduleNames       : yamlObj.moduleNames,
            aggregateName     : yamlObj.aggregateName,
            hasOAuth          : yamlObj.hasOAuth,
            hasTenant         : yamlObj.hasTenant,
            properties,
            excluded          : yamlObj.excluded,
        };
    }

    private parseModuleDefinitionSchema(yamlObj: any): void
    {
        if (typeof yamlObj.boundedContextName !== 'string')     throw new Error('Yaml file structure error, boundedContextName field missing');
        if (typeof yamlObj.moduleName !== 'string')             throw new Error('Yaml file structure error, moduleName field missing');
        if (typeof yamlObj.moduleNames !== 'string')            throw new Error('Yaml file structure error, moduleNames field missing');
        if (typeof yamlObj.aggregateName !== 'string')          throw new Error('Yaml file structure error, aggregateName field missing');
        if (typeof yamlObj.hasOAuth !== 'boolean')              throw new Error('Yaml file structure error, hasOAuth field missing');
        if (typeof yamlObj.hasTenant !== 'boolean')             throw new Error('Yaml file structure error, hasTenant field missing');
    }
}
