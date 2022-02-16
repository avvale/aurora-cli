// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// imports
import { Command, Flags } from '@oclif/core';
import { exec } from 'child_process';
import * as shell from 'shelljs';
import * as ora from 'ora';
import { Operations, StateService } from '../../@cliter';

export default class New extends Command
{
    static description = 'Create new aurora project';

    static flags =
    {
        help     : Flags.help({ char: 'h' }),
        package  : Flags.boolean({ char: 'p' }),
        dashboard: Flags.boolean({ char: 'd' }),
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
        /*
        shell.exec(`npm --prefix ${args.name} install`, { silent: true, async: true }, () =>
        {
            dependenciesSpinner.succeed('Dependencies installed');

            if (!flags.package && !flags.dashboard)
            {
                // generate application env file
                operations.generateApplicationEnvFile(args.name);
            }
        });
        */

        this.log(`npm install ./${args.name}`);

        exec(`npm install ./${args.name}`, (error, stdout, stderr) =>
        {
            if (error)
            {
                this.error(`exec error: ${error}`);
                return;
            }

            // this.log(`stdout: ${stdout}`);
            // this.error(`stderr: ${stderr}`);
            dependenciesSpinner.succeed('Dependencies installed');
        });
    }
}
