import { Args, Command, Flags } from '@oclif/core';
import { BackHandler, ModuleDefinitionSchema, Prompter, Scope, ScopeElement, YamlManager, cliterConfig } from '../@cliter';
import { generateGraphqlTypes } from '../@cliter/functions/back';
import { getBoundedContextModuleFromFlag, loadJsonLockFile, reviewOverwrites } from '../@cliter/functions/common';
import { FrontHandler } from '../@cliter/handlers/front.handler';

export default class Load extends Command
{
    static description = 'Load aurora [bounded-context, module] from yaml file, located in the cliter folder';

    static flags = {
        help : Flags.help({ char: 'h' }),
        force: Flags.boolean({
            char       : 'f',
            description: 'Overwrite existing files.',
        }),
        name: Flags.string({
            char       : 'n',
            required   : true,
            description: 'Name of element to load.',
        }),
        noGraphQLTypes: Flags.boolean({
            char       : 'g',
            description: 'Avoid generating graphql types.',
        }),
        overwriteInterface: Flags.boolean({
            char       : 'w',
            description: 'Overwrite front interfaces.',
        }),
        tests: Flags.boolean({
            char       : 't',
            description: 'Create test e2e files.',
        }),
        verbose: Flags.boolean({
            char       : 'v',
            description: 'Reports on screen all the steps followed by the command.',
        }),
    };

    static args = {
        firstArg: Args.string({
            name       : 'scope',
            required   : true,
            description: 'Scope where our command will act.',
            options    : [
                'back',
                'front',
            ],
        }),
        secondArg: Args.string({
            name       : 'element',
            required   : true,
            description: 'Type element to load.',
            options    : [
                'bounded-context',
                'module',
            ],
        }),
    };

    static examples = [
        '$ aurora load back module -n=my-bounded-context/my-module',
        '$ aurora --help',
    ];

    public async run(): Promise<void>
    {
        const { args, flags }   = await this.parse(Load);

        if (args.secondArg === ScopeElement.MODULE)
        {
            const flagName: { boundedContextName?: string; moduleName?: string; } = getBoundedContextModuleFromFlag(this, flags.name);
            const { boundedContextName, moduleName } = await Prompter.promptForLoadModule(flagName.boundedContextName, flagName.moduleName);

            // create yaml file
            const schema: ModuleDefinitionSchema = YamlManager.loadYamlConfigFile(boundedContextName, moduleName);

            // define state like a generate command
            const generateCommandState = {
                command  : this,
                flags,
                lockFiles: loadJsonLockFile(boundedContextName, moduleName),
                schema,
            };

            if (args.firstArg === Scope.BACK)
            {
                await BackHandler.generateModule(
                    generateCommandState,
                    {
                        hasGenerateTestingFiles: flags.tests,
                    },
                );

                if (!flags.noGraphQLTypes) await generateGraphqlTypes(generateCommandState);
            }

            if (args.firstArg === Scope.FRONT)
            {
                await FrontHandler.generateModule(
                    generateCommandState,
                    {
                        hasGenerateTestingFiles: flags.tests,
                    },
                );
            }

            await reviewOverwrites(generateCommandState);
        }

        /* if (args.secondArg === ScopeElement.BOUNDED_CONTEXT)
        {
            const { boundedContextName }: any = await Prompter.promptForLoadBoundedContext(flags.boundedContext);

            const yamlFiles = fs.readdirSync(path.join(process.cwd(), 'cliter', boundedContextName.toKebabCase()));

            const batchOperations = [];
            for (const yamlFile of yamlFiles.filter(files => files.endsWith(cliterConfig.schemaDefinitionExtension)))
            {
                // load yaml file
                const schema: ModuleDefinitionSchema    = YamlManager.loadYamlConfigFile(boundedContextName, yamlFile.replace(cliterConfig.schemaDefinitionExtension, ''));
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
}
