import { Command, Flags } from '@oclif/core';
import { TemplateElement, Prompter, ModuleDefinitionSchema, YamlManager, BackHandler } from '../../@cliter/index';
import { FrontHandler } from '../../@cliter/handlers/front.handler';
import { getBoundedContextModuleFromFlag, loadJsonLockFile, reviewOverwrites } from '../../@cliter/functions/common';
import { generateGraphqlTypes } from '../../@cliter/functions/back';

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
            if (flags.module) moduleFlag = getBoundedContextModuleFromFlag(this, flags.module);

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

            if (!flags.noGraphQLTypes && !flags.dashboard)
            {
                generateGraphqlTypes(generateCommandState);
            }

            await reviewOverwrites(generateCommandState);
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
}
