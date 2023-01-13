import { Command, Flags } from '@oclif/core';
import { AdditionalApis, BackHandler, Prompter, Properties, Property, SqlType, TemplateElement } from '../../@cliter';
import { generateGraphqlTypes } from '../../@cliter/functions/back';
import { getBoundedContextModuleFromFlag } from '../../@cliter/functions/common';

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
            if (flags.module) moduleFlag = getBoundedContextModuleFromFlag(this, flags.module);

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

            // define state for generate command
            const generateCommandState = {
                command  : this,
                flags,
                lockFiles: [],
                schema   : {
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
            };

            // add properties defined by user
            // eslint-disable-next-line no-await-in-loop
            while ((await Prompter.promptForGenerateAggregate()).hasValueObject)
            {
                // eslint-disable-next-line no-await-in-loop
                properties.add(await Prompter.promptDefineAggregateProperty(generateCommandState));
                Prompter.printValueObjectsTable(this, properties);
            }

            // add time stamp properties for model
            properties.add(new Property({ name: 'createdAt', type: SqlType.TIMESTAMP, nullable: true }));
            properties.add(new Property({ name: 'updatedAt', type: SqlType.TIMESTAMP, nullable: true }));
            properties.add(new Property({ name: 'deletedAt', type: SqlType.TIMESTAMP, nullable: true }));

            // generate module files
            BackHandler.generateModule(
                generateCommandState,
                { hasGenerateTestingFiles: true },
            );

            if (!flags.noGraphQLTypes)
            {
                // generate graphql files
                generateGraphqlTypes(generateCommandState);
            }
        }
    }
}
