// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// imports
import { Command, Flags } from '@oclif/core';
import { AdditionalApis, BackHandler, ModuleDefinitionSchema, Operations, Prompter, Properties, Property, SqlType, StateService, TemplateElement } from '../../@cliter';
import { generateGraphqlTypes } from '../../@cliter/functions/back';

export default class Generate extends Command
{
    static description = 'Generate aurora bounded context/module [boundedContext, module]';

    static flags =
    {
        // can pass either --help or -h
        help          : Flags.help({ char: 'h' }),
        verbose       : Flags.boolean({ char: 'v' }),
        force         : Flags.boolean({ char: 'f' }),
        module        : Flags.string({ char: 'm' }),
        boundedContext: Flags.string({ char: 'b' }),
        noGraphQLTypes: Flags.boolean({ char: 'g' }),
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
                'api',
                'a',
            ],
            required: true,
        },
    ];

    static examples = [
        '$ aurora generate module -m=my-bounded-context/my-module --force --noGraphQLTypes',
        '$ aurora generate m -m=my-bounded-context/my-module --force --noGraphQLTypes',
        '$ aurora --help',
    ];

    async run(): Promise<void>
    {
        const { args, flags } = await this.parse(Generate);

        if (args.elementType === 'b') args.elementType = TemplateElement.BACK_BOUNDED_CONTEXT;
        if (args.elementType === 'm') args.elementType = TemplateElement.BACK_MODULE;

        if (args.elementType === TemplateElement.BACK_MODULE)
        {
            let moduleFlag: { boundedContextName?: string; moduleName?: string; } = {};
            if (flags.module) moduleFlag = Operations.parseFlagOfBoundedContextAndModule(this, flags.module);

            const { boundedContextName, moduleName, moduleNames, hasOAuth, hasTenant }: any = await Prompter.promptForGenerateModule(moduleFlag?.boundedContextName, moduleFlag?.moduleName);

            const properties: Properties = new Properties();
            properties.moduleName        = moduleName;

            // add id property for model
            properties.add(new Property({
                name      : 'id',
                type      : SqlType.ID,
                primaryKey: true,
                length    : 36,
                nullable  : false,
            }));

            // add properties defined by user
            while ((await Prompter.promptForGenerateAggregate()).hasValueObject)
            {
                properties.add(await Prompter.promptDefineAggregateProperty(this, boundedContextName, moduleName, moduleNames));
                Prompter.printValueObjectsTable(this, properties);
            }

            // add time stamp properties for model
            properties.add(new Property({ name: 'createdAt', type: SqlType.TIMESTAMP, nullable: true }));
            properties.add(new Property({ name: 'updatedAt', type: SqlType.TIMESTAMP, nullable: true }));
            properties.add(new Property({ name: 'deletedAt', type: SqlType.TIMESTAMP, nullable: true }));

            const schema: ModuleDefinitionSchema = {
                boundedContextName,
                moduleName,
                moduleNames,
                aggregateName : boundedContextName.toPascalCase() + moduleName.toPascalCase(),
                hasOAuth,
                hasTenant,
                hasAuditing   : false,
                properties,
                additionalApis: new AdditionalApis(),
            };

            // set stateService
            const stateService          = container.resolve(StateService);
            stateService.command        = this;
            stateService.schema         = schema;
            stateService.flags          = flags;
            stateService.flags.tests    = true; // enable by default create test e2e files

            // generate module files
            BackHandler.generateModule({
                command: this,
                flags  : {
                    ...flags,
                    tests: true,
                },
                schema: {
                    boundedContextName,
                    moduleName,
                    moduleNames,
                    aggregateName : boundedContextName.toPascalCase() + moduleName.toPascalCase(),
                    hasOAuth,
                    hasTenant,
                    hasAuditing   : false,
                    properties,
                    additionalApis: new AdditionalApis(),
                },
            });

            if (!flags.noGraphQLTypes)
            {
                // generate graphql files
                await generateGraphqlTypes();
            }
        }
    }
}
