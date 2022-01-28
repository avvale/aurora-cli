import 'reflect-metadata';
import { container } from 'tsyringe';
import { Command, flags } from '@oclif/command';
import { Operations } from './../@cliter/utils';
import { StateService } from '../@cliter/services/state.service';
import * as shell from 'shelljs';
import * as ora from 'ora';

export default class New extends Command
{
    static description = 'Create new aurora project';

    static flags =
    {
        help     : flags.help({ char: 'h' }),
        package  : flags.boolean({ char: 'p' }),
        dashboard: flags.boolean({ char: 'd' }),
    };

    static args = [
        {
            name       : 'name',
            required   : true,
            description: 'Type name of element to create, application, package or dashboard.'
        }
    ];

    async run()
    {
        const { args, flags } = this.parse(New);

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
        shell.exec(`npm --prefix ${args.name} install`, { silent: true, async: true }, () =>
        {
            dependenciesSpinner.succeed('Dependencies installed');

            if (!flags.package && !flags.dashboard)
            {
                // generate application env file
                operations.generateApplicationEnvFile(args.name);
            }
        });
    }
}
