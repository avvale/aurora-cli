import { Command, Flags } from '@oclif/core';
import { BackHandler, FrontHandler, Scope } from '../@cliter';
import { generateEnvFile, installDependencies } from '../@cliter/functions/back';

export default class New extends Command
{
    static description = 'Create new aurora item';

    static flags =
    {
        help : Flags.help({ char: 'h' }),
        force: Flags.boolean({
            char       : 'f',
            description: 'Overwrite existing files.',
        }),
        install: Flags.boolean({
            char       : 'i',
            description: 'Install dependencies after create item.',
        }),
        verbose: Flags.boolean({
            char       : 'v',
            description: 'Reports on screen all the steps followed by the command.',
        }),
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
            name       : 'name',
            required   : true,
            description: 'Name of item to create',
        },
    ];

    static examples = [
        '$ aurora new back my-app',
        '$ aurora --help',
    ]

    public async run(): Promise<void>
    {
        const { args, flags } = await this.parse(New);

        switch (args.scope)
        {
            case Scope.BACK:
                await BackHandler.new({
                    appName: args.name,
                    command: this,
                    flags,
                });

                await generateEnvFile(
                    this,
                    args.name,
                );

                if (flags.install) installDependencies(args.name);
                break;

            case Scope.FRONT:
                await FrontHandler.new({
                    appName: args.name,
                    command: this,
                    flags,
                });

                if (flags.install) installDependencies(args.name);
                break;

            case 'back-package':
                // stateService.packageName = args.name;
                // TODO: generate package
                // await Operations.generatePackage();
                // if (flags.install) installDependencies(args.name);
                break;
        }
    }
}
