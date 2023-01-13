import { Command, Flags } from '@oclif/core';
import { BackHandler } from '../@cliter';
import { generateApplicationEnvFile, installDependencies } from '../@cliter/functions/back';

export default class New extends Command
{
    static description = 'Create new aurora item';

    static flags =
    {
        help   : Flags.help({ char: 'h' }),
        install: Flags.boolean({ char: 'i' }),
        verbose: Flags.boolean({ char: 'v' }),
    };

    static args = [
        {
            name       : 'type',
            required   : true,
            description: 'Type of element to create, application, package or dashboard.',
            options    : [
                'back',
                'front',
                'back-package',
            ],
        },
        {
            name       : 'name',
            required   : true,
            description: 'name of item to create',
        },
    ];

    public async run(): Promise<void>
    {
        const { args, flags } = await this.parse(New);

        switch (args.type)
        {
            case 'back':
                await BackHandler.newBack({
                    appName: args.name,
                    command: this,
                    flags,
                });

                await generateApplicationEnvFile(
                    this,
                    args.name,
                );

                if (flags.install) installDependencies(args.name);
                break;

            case 'front':
                // stateService.dashboardName = args.name;
                // TODO: generate dashboard
                // await Operations.generateDashboard();
                // if (flags.install) installDependencies(args.name);
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
