// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// imports
import * as shell from 'node:child_process';
import { Command, Flags, CliUx } from '@oclif/core';
import { BackHandler, Operations, StateService } from '../../@cliter';
import { generateApplicationEnvFile } from '../../@cliter/functions/back';

export default class New extends Command
{
    static description = 'Create new aurora project';

    static flags =
    {
        dashboard: Flags.boolean({ char: 'd' }),
        help     : Flags.help({ char: 'h' }),
        package  : Flags.boolean({ char: 'p' }),
        install  : Flags.boolean({ char: 'i' }),
        verbose  : Flags.boolean({ char: 'v' }),
    };

    static args = [
        {
            name       : 'name',
            required   : true,
            description: 'Type name of element to create, application, package or dashboard.',
        },
    ];

    async run()
    {
        const { args, flags } = await this.parse(New);

        const stateService     = container.resolve(StateService);
        stateService.command   = this;
        stateService.flags     = flags;

        switch (true)
        {
            case flags.package:
                stateService.packageName = args.name;
                await Operations.generatePackage();
                break;

            case flags.dashboard:
                stateService.dashboardName = args.name;
                await Operations.generateDashboard();
                break;

            default:
                await BackHandler.newApplication({
                    appName: args.name,
                    command: this,
                    flags,
                });
                break;
        }

        if (!flags.package && !flags.dashboard)
        {
            // generate application .env file
            await generateApplicationEnvFile(args.name);
        }

        if (flags.install)
        {
            CliUx.ux.action.start('Installing dependencies');

            const install = shell.spawn('npm', ['install'], { cwd: args.name, timeout: 300 * 100 });

            install.stdout.on('data', data =>
            {
                console.log(`${data}`);
            });

            install.stderr.on('data', data =>
            {
                console.error(`${data}`);
            });

            install.on('error', err =>
            {
                console.error(`${err}`);
            });
        }
    }
}
