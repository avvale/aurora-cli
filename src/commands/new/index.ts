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

        const stateService     = container.resolve(StateService);
        stateService.command   = this;
        stateService.flags     = flags;

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
                stateService.dashboardName = args.name;
                // TODO: generate dashboard
                // await Operations.generateDashboard();
                break;

            case 'package':
                stateService.packageName = args.name;
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
