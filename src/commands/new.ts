import 'reflect-metadata';
import { container } from 'tsyringe';
import { Command, flags } from '@oclif/command';
import { Operations, Prompter } from './../@cliter/utils';
import { StateService } from '../@cliter/services/state.service';
import * as chalk from 'chalk';
import * as shell from 'shelljs';
import * as ora from 'ora';

export default class New extends Command
{
    static description = 'Create new hades project';

    static flags =
    {
        help: flags.help({ char: 'h' }),
        credentials: flags.boolean({ char: 'c' }),
    };

    static args = [
        {
            name: 'appName',
            required: true,
            description: 'Type app name to create'
        }
    ];

    async run()
    {
        const { args, flags } = this.parse(New)

        // declare variables
        let gitFlags = '';
        const gitCommand = 'git clone';
        let  repository = 'https://github.com/techedge-group/hades';

        // get github credentials
        if (flags.credentials)
        {
            const { githubUsername, githubPassword }: any = await Prompter.promptForGithubCredentials();
            repository = `https://${githubUsername}:${githubPassword}@github.com/techedge-group/hades`;
        }

        // get bounded context
        const { branch }: any = await Prompter.promptForNewApplication();
        if (branch !== 'none') gitFlags += '--single-branch --branch ' + branch

        // exec shell
        const installerSpinner = ora('Installing Hades project').start();
        const githubThread = shell.exec(`${gitCommand} ${gitFlags} ${repository} ${args.appName}`, {silent: true, async: true}, async (code, stdout, stderr) =>
        {
            if (code !== 0)
            {
                githubThread.kill();
                installerSpinner.stop();
                this.log(chalk.red.bold(`[ERROR ${code}]`), stderr);
            }
            // install dependencies
            else
            {
                installerSpinner.succeed('Project installed');

                const dependenciesSpinner = ora('Installing dependencies').start();
                shell.exec(`npm --prefix ${args.appName} install`, {silent: true, async: true}, () => {
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
        });
    }
}
