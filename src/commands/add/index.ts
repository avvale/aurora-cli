// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// imports
import { Command, Flags } from '@oclif/core';
import { Operations, Prompter, StateService } from '../../@cliter';

export default class Install extends Command
{
    static description = 'Generate pipeline to deploy application in cloud';

    static flags =
    {
        // can pass either --help or -h
        help     : Flags.help({ char: 'h' }),
        force    : Flags.boolean({ char: 'f' }),
        dashboard: Flags.boolean({ char: 'd' }),
    };

    static args = [];

    static examples = [
        '$ aurora add',
        '$ aurora --help',
    ];

    async run(): Promise<void>
    {
        const { args, flags } = await this.parse(Install);

        const { packageName }: any = await Prompter.promptAddPackage();

        // set stateService
        const stateService     = container.resolve(StateService);
        stateService.command   = this;
        stateService.flags     = flags;

        if (flags.dashboard)
        {
            Operations.installFrontPackage(packageName);
        }
        else
        {
            Operations.installBackPackage(packageName);
        }
    }
}
