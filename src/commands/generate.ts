import 'reflect-metadata';
import { container } from 'tsyringe';
import { Command, flags } from '@oclif/command';
import { TemplateElement, SqlType, ModuleDefinitionSchema } from './../@cliter/types';
import { StateService } from './../@cliter/services/state.service';
import { Operations, Property, Properties, Prompter } from './../@cliter/utils';
import * as _ from 'lodash';

export default class Generate extends Command
{
    static description = 'Generate hades elements [boundedContext, module]';

    static flags =
    {
        help  : flags.help({ char: 'h' }),
        module: flags.string({ char: 'm' }),
        force : flags.boolean({ char: 'f' }),
    };

    static args = [
        {
            name       : 'elementType',
            required   : true,
            description: 'Type element to create',
            options    : ['bounded-context', 'b', 'module', 'm']
        }
    ];

    async run()
    {
        const { args, flags } = this.parse(Generate);

        if (args.elementType === 'b') args.elementType = 'bounded-context';
        if (args.elementType === 'm') args.elementType = 'module';

        if (args.elementType === TemplateElement.MODULE)
        {
            let moduleFlag: any = {};
            if (flags.module) moduleFlag = Operations.parseFlagOfBoundedContextAndModule(this, flags.module);

            const { boundedContextName, moduleName, moduleNames, hasOAuth, hasTenant }: any = await Prompter.promptForGenerateModule(moduleFlag?.boundedContextName, moduleFlag?.moduleName);

            // add id property
            const properties: Properties = new Properties([new Property({ name: 'id', type: SqlType.ID, primaryKey: true, length: 36, nullable: false })]);

            // add properties defined by user
            while ((await Prompter.promptForGenerateAggregate()).hasValueObject)
            {
                properties.add(await Prompter.promptDefineAggregateProperty(this, boundedContextName, moduleName, moduleNames));
                Prompter.printValueObjectsTable(this, properties);
            }
            // add time stamp properties
            properties.add(new Property({ name: 'created_at', type: SqlType.TIMESTAMP, nullable: true }));
            properties.add(new Property({ name: 'updated_at', type: SqlType.TIMESTAMP, nullable: true }));
            properties.add(new Property({ name: 'deleted_at', type: SqlType.TIMESTAMP, nullable: true }));

            const schema: ModuleDefinitionSchema = {
                boundedContextName,
                moduleName,
                moduleNames,
                aggregateName: boundedContextName.toPascalCase() + moduleName.toPascalCase(),
                hasOAuth,
                hasTenant,
                properties
            };

            // set stateService
            const stateService          = container.resolve(StateService);
            stateService.command        = this;
            stateService.schema         = schema;
            stateService.flags          = flags;
            stateService.flags.tests    = true; // enable by default create test e2e files

            const operations = new Operations();

            // generate module files
            operations.generateModule();

            // generate graphql files
            operations.generateGraphqlTypes();
        }
    }
}
