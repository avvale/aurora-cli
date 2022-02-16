// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// imports
import { Command, Flags } from '@oclif/core';
import { exec } from 'child_process';
import * as ora from 'ora';
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

        const operations = new Operations();

        switch (true)
        {
            case flags.package:
                stateService.packageName = args.name;
                await operations.generatePackage();
                break;

            case flags.dashboard:
                stateService.dashboardName = args.name;
                await operations.generateDashboard();
                break;

            default:
                stateService.appName = args.name;
                await operations.generateApplication();
                break;
        }

        const dependenciesSpinner = ora('Installing dependencies').start();

        exec(`cd ${args.name} && npm install`, (error, stdout, stderr) =>
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

            dependenciesSpinner.succeed('Dependencies installed');

            if (!flags.package && !flags.dashboard)
            {
                // generate application env file
                operations.generateApplicationEnvFile(args.name);
            }
        });
    }
}
