import { Command, Flags } from '@oclif/core';
import { Prompter, ModuleDefinitionSchema, YamlManager, BackHandler, Scope, ScopeElement } from '../@cliter';
import { FrontHandler } from '../@cliter/handlers/front.handler';
import { getBoundedContextModuleFromFlag, loadJsonLockFile, reviewOverwrites } from '../@cliter/functions/common';
import { generateGraphqlTypes } from '../@cliter/functions/back';

export default class Load extends Command
{
    static description = 'Reload aurora [bounded-context, module] from yaml file, located in the cliter folder';

    static flags =
    {
        help              : Flags.help({ char: 'h' }),
        boundedContext    : Flags.string({ char: 'b' }),
        dashboard         : Flags.boolean({ char: 'd' }),
        force             : Flags.boolean({ char: 'f' }),
        module            : Flags.string({ char: 'm' }),
        noGraphQLTypes    : Flags.boolean({ char: 'g' }),
        overwriteInterface: Flags.boolean({ char: 'w' }),
        tests             : Flags.boolean({ char: 't' }),
        verbose           : Flags.boolean({ char: 'v' }),
    };

    static args = [
        {
            name       : 'scope',
            required   : true,
            description: 'Scope where our command will act.',
            options    : [
                'back',
                'front',
                'back-package',
            ],
        },
        {
            name       : 'element',
            required   : true,
            description: 'Type element to load.',
            options    : [
                'bounded-context',
                'module',
            ],
        },
    ];

    public async run(): Promise<void>
    {
        const { args, flags }   = await this.parse(Load);

        if (
            args.scope === Scope.BACK &&
            args.element === ScopeElement.MODULE
        )
        {
            if (!flags.module) this.error('Module flag is required for generate module command.');

            const moduleFlag: { boundedContextName?: string; moduleName?: string; } = getBoundedContextModuleFromFlag(this, flags.module);
            const { boundedContextName, moduleName } = await Prompter.promptForLoadModule(moduleFlag?.boundedContextName, moduleFlag?.moduleName);

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

            if (!flags.noGraphQLTypes && !flags.dashboard)
            {
                generateGraphqlTypes(generateCommandState);
            }

            await reviewOverwrites(generateCommandState);
        }

        /* if (args.element === TemplateElement.BACK_BOUNDED_CONTEXT)
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
}
