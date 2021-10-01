import 'reflect-metadata';
import { container } from 'tsyringe';
import { Command, flags } from '@oclif/command';
import { TemplateElement, ModuleDefinitionSchema, LockFile } from './../@cliter/types';
import { Operations, Property, Properties, Prompter } from './../@cliter/utils';
import { StateService } from './../@cliter/services/state.service';
import { FileManager } from './../@cliter/utils/file-manager';
import * as logSymbols from 'log-symbols';
import * as chalk from 'chalk';
import * as emoji from 'node-emoji';
import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as shell from 'shelljs';
import * as _ from 'lodash';

export default class Load extends Command
{
    static description = 'Load hades elements [bounded-context, module] from yaml file, located in the cliter folder';

    static flags =
    {
        help: flags.help({ char: 'h' }),
        module: flags.string({ char: 'm' }),
        boundedContext: flags.string({ char: 'b' }),
        force: flags.boolean({ char: 'f' }),
        verbose: flags.boolean({ char: 'v' }),
        tests: flags.boolean({ char: 't' }),
    };

    static args = [
        {
            name: 'elementType',
            required: true,
            description: 'Type element to create',
            options: ['bounded-context', 'b', 'module', 'm']
        }
    ];

    async run()
    {
        const { args, flags }   = this.parse(Load);
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

            // generate module files
            await operations.generateModule();

            await this.reviewOverwrites(operations, stateService);
        }

        if (args.elementType.toSnakeCase() === TemplateElement.BOUNDED_CONTEXT)
        {
            const { boundedContextName }: any = await Prompter.promptForLoadBoundedContext(flags.boundedContext);

            const yamlFiles = fs.readdirSync(path.join(process.cwd(), 'cliter', boundedContextName.toKebabCase()));

            for (const yamlFile of yamlFiles.filter(files => files.endsWith('.yml')))
            {
                // create yaml file
                const schema: ModuleDefinitionSchema    = this.loadYamlConfigFile(boundedContextName, yamlFile.replace('.yml', ''));
                const currentLockFiles: LockFile[]      = this.loadJsonLockFile(boundedContextName, schema.moduleName);

                // set stateService
                stateService.command   = this;
                stateService.schema    = schema;
                stateService.lockFiles = currentLockFiles;
                stateService.flags     = flags;

                // generate module files
                await operations.generateModule();
            }

            // generate graphql files
            await this.reviewOverwrites(operations, stateService);
        }
    }

    private async reviewOverwrites(operations: Operations, stateService: StateService)
    {
        // generate graphql files
        await operations.generateGraphqlTypes();

        if (stateService.originFiles.length > 0)
        {
            stateService.command.log(`
********************************************
***              ATTENTION!              ***
********************************************`);
            stateService.command.log(`%s %s %s There are files that have not been overwritten because they were modified, the following origin files have been created.`, logSymbols.warning, chalk.yellow.bold('WARNING'), emoji.get('small_red_triangle'));

            for (const originFile of stateService.originFiles)
            {
                stateService.command.log(`%s ${originFile}`, emoji.get('question'));
            }

            let deleteOriginFiles = true;
            let fileToCompare: string | undefined = '';
            let actionResponse: string = '';

            if ((await Prompter.promptForCompareOriginFile()).hasCompareOriginFile)
            {
                // list all origin files
                fileToCompare = <string>(await Prompter.promptSelectOriginToCompare(stateService.originFiles)).fileToCompare;
                shell.exec(`code --diff ${fileToCompare} ${fileToCompare.replace('.origin', '')}`, {silent: true, async: true}, () => {});

                while (actionResponse !== stateService.cliterConfig.compareActions.finish)
                {
                    if (stateService.originFiles.length > 0)
                    {
                        actionResponse = <string>(await Prompter.promptSelectCompareAction()).compareAction;

                        switch(actionResponse)
                        {
                            case stateService.cliterConfig.compareActions.deleteOrigin:
                                fs.unlinkSync(<string>fileToCompare);                           // delete origin file
                                fileToCompare = _.head(stateService.originFiles.slice());      // get next file
                                if (fileToCompare) shell.exec(`code --diff ${fileToCompare} ${fileToCompare.replace('.origin', '')}`, {silent: true, async: true}, () => {});
                            break;
                            case stateService.cliterConfig.compareActions.selectFile:
                                console.log('selectFile ', fileToCompare);
                                fileToCompare = <string>(await Prompter.promptSelectOriginToCompare(stateService.originFiles)).fileToCompare;
                                shell.exec(`code --diff ${fileToCompare} ${fileToCompare.replace('.origin', '')}`, {silent: true, async: true}, () => {});
                            break;
                        }
                    }
                    else
                    {
                        stateService.command.log(`[INFO] All files have been reviewed`);
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

        return <LockFile[]>(JSON.parse(fs.readFileSync(jsonPath, 'utf8')).files);
    }

    private loadYamlConfigFile(boundedContextName: string, moduleName: string): ModuleDefinitionSchema
    {
        const yamlPath = path.join(process.cwd(), 'cliter', boundedContextName.toKebabCase(), moduleName.toKebabCase() + '.yml');

        // read yaml file
        const yamlObj = <any>yaml.load(fs.readFileSync(yamlPath, 'utf8'));

        this.parseModuleDefinitionSchema(yamlObj);

        const properties = new Properties();

        for (const property of yamlObj.aggregateProperties)
        {
            properties.add(
                new Property({
                    name: property.name,
                    type: property.type,
                    primaryKey: property?.primaryKey,
                    enumOptions: property?.enumOptions?.join(),
                    decimals: property?.decimals,
                    length: property?.length,
                    minLength: property?.minLength,
                    maxLength: property?.maxLength,
                    nullable: property?.nullable,
                    defaultValue: property?.defaultValue,
                    relationship: property?.relationship,
                    relationshipSingularName: property?.relationshipSingularName,
                    relationshipAggregate: property?.relationshipAggregate,
                    relationshipModulePath: property?.relationshipModulePath,
                    relationshipKey: property?.relationshipKey,
                    relationshipField: property?.relationshipField,
                    intermediateTable: property?.intermediateTable,
                    intermediateModel: property?.intermediateModel,
                    intermediateModelModuleSection: property?.intermediateModelModuleSection,
                    intermediateModelFile: property?.intermediateModelFile,
                    index: property?.index,
                    example: property?.example,
                    faker: property?.faker,
                })
            );
        }

        return {
            boundedContextName  : yamlObj.boundedContextName,
            moduleName          : yamlObj.moduleName,
            moduleNames         : yamlObj.moduleNames,
            aggregateName       : yamlObj.aggregateName,
            hasOAuth            : yamlObj.hasOAuth,
            hasTenant           : yamlObj.hasTenant,
            properties          : properties,
            excluded            : yamlObj.excluded,
        }
    }

    private parseModuleDefinitionSchema(yamlObj: any)
    {
        if (typeof yamlObj.boundedContextName !== 'string')     throw new Error(`Yaml file structure error, boundedContextName field missing`);
        if (typeof yamlObj.moduleName !== 'string')             throw new Error(`Yaml file structure error, moduleName field missing`);
        if (typeof yamlObj.moduleNames !== 'string')            throw new Error(`Yaml file structure error, moduleNames field missing`);
        if (typeof yamlObj.aggregateName !== 'string')          throw new Error(`Yaml file structure error, aggregateName field missing`);
        if (typeof yamlObj.hasOAuth !== 'boolean')              throw new Error(`Yaml file structure error, hasOAuth field missing`);
        if (typeof yamlObj.hasTenant !== 'boolean')             throw new Error(`Yaml file structure error, hasTenant field missing`);
    }
}
