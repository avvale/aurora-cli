// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// imports
import { Command, Flags, CliUx } from '@oclif/core';
import * as shell from 'node:child_process';
import { Operations, StateService } from '../../@cliter';

export default class New extends Command
{
    static description = 'Create new aurora project';

    static flags =
    {
        dashboard: Flags.boolean({ char: 'd' }),
        help     : Flags.help({ char: 'h' }),
        package  : Flags.boolean({ char: 'p' }),
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
                stateService.appName = args.name;
                await Operations.generateApplication();
                break;
        }

        CliUx.ux.action.start('Installing dependencies');

        shell.exec(`cd ${args.name} && npm i`, (error, stdout, stderr) =>
        {
            if (error)
            {
                this.error(`exec error: ${error}`);
                return;
            }

            if (flags.verbose)
            {
                this.log(`${stdout}`);
            }

            CliUx.ux.action.stop('Dependencies installed');

            if (!flags.package && !flags.dashboard)
            {
                // generate application env file
                Operations.generateApplicationEnvFile(args.name);
            }
        });
    }
}
