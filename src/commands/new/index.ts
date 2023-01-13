import { Command, Flags } from '@oclif/core';
import { BackHandler } from '../../@cliter';
import { generateApplicationEnvFile, installDependencies } from '../../@cliter/functions/back';

export default class New extends Command
{
    static description = 'Create new aurora project';

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
                'application',
                'dashboard',
                'package',
            ],
        },
        {
            name       : 'name',
            required   : true,
            description: 'name of item to create',
        },
    ];

    async run()
    {
        const { args, flags } = await this.parse(New);

        switch (args.type)
        {
            case 'application':
                await BackHandler.newApplication({
                    appName: args.name,
                    command: this,
                    flags,
                });
                break;

            case 'dashboard':
                // stateService.dashboardName = args.name;
                // TODO: generate dashboard
                // await Operations.generateDashboard();
                break;

            case 'package':
                // stateService.packageName = args.name;
                // TODO: generate package
                // await Operations.generatePackage();
                break;
        }

        if (!flags.package && !flags.dashboard)
        {
            // generate application .env file
            await generateApplicationEnvFile(
                this,
                args.name,
            );
        }

        if (flags.install)
        {
            installDependencies(args.name);
        }
    }
}
