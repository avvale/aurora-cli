import { Args, Command, Flags, ux } from '@oclif/core';
import { BackHandler, FrontHandler, Scope } from '../@cliter';
import { generateEnvFile, installDependencies } from '../@cliter/functions/back';
import { exec } from '../@cliter/functions/common';

export default class New extends Command
{
    static description = 'Create new aurora item';

    static flags =
    {
        help : Flags.help({ char: 'h' }),
        force: Flags.boolean({
            char       : 'f',
            description: 'Overwrite existing files.',
        }),
        uninstall: Flags.boolean({
            char       : 'u',
            description: 'Not install dependencies after create item.',
        }),
        verbose: Flags.boolean({
            char       : 'v',
            description: 'Reports on screen all the steps followed by the command.',
        }),
    };

    static args = {
        firstArg: Args.string({
            name       : 'scope',
            required   : true,
            description: 'Scope where our command will act.',
            options    : [
                'back',
                'front',
            ],
        }),
        secondArg: Args.string({
            name       : 'name',
            required   : true,
            description: 'Name of item to create',
        }),
    };

    static examples = [
        '$ aurora new back my-app',
        '$ aurora --help',
    ]

    public async run(): Promise<void>
    {
        const { args, flags } = await this.parse(New);

        switch (args.firstArg)
        {
            case Scope.BACK:
                await BackHandler.new({
                    appName: args.secondArg,
                    command: this,
                    flags,
                });

                await generateEnvFile(
                    this,
                    args.secondArg,
                );

                if (!flags.uninstall)
                {
                    await installDependencies(args.secondArg);

                    ux.action.start('Generating GraphQL types');
                    await exec('npm', ['run', 'graphql:types'], {
                        cwd    : args.secondArg,
                        verbose: false,
                        onClose: () => ux.action.stop('Completed!'),
                    });
                }

                break;

            case Scope.FRONT:
                await FrontHandler.new({
                    appName: args.secondArg,
                    command: this,
                    flags,
                });

                if (!flags.uninstall) await installDependencies(args.secondArg);
                break;
        }
    }
}
