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
        help       : flags.help({ char: 'h' }),
        credentials: flags.boolean({ char: 'c' }),
    };

    static args = [
        {
            name       : 'appName',
            required   : true,
            description: 'Type app name to create'
        }
    ];

    async run()
    {
        const { args, flags } = this.parse(New);

        const stateService     = container.resolve(StateService);
        stateService.command   = this;
        stateService.flags     = flags;
        stateService.appName   = args.appName;

        const operations = new Operations();
        operations.generateApplication();

        const dependenciesSpinner = ora('Installing dependencies').start();
        shell.exec(`npm --prefix ${args.appName} install`, { silent: true, async: true }, () =>
        {
            dependenciesSpinner.succeed('Dependencies installed');

            // set stateService
            const stateService     = container.resolve(StateService);
            stateService.command   = this;
            stateService.flags     = flags;
            stateService.appName   = args.appName;

            const operations = new Operations();

            // generate env file
            operations.generateEnvFile();
        });
    }
}
