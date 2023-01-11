import { Command, Flags } from '@oclif/core';
import { Prompter } from '../../@cliter';
import { CiCdHandler } from '../../@cliter/handlers';

export default class Pipeline extends Command
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
        '$ aurora pipeline',
        '$ aurora --help',
    ];

    async run(): Promise<void>
    {
        const { args, flags } = await this.parse(Pipeline);

        const { from, to, service }: any = await Prompter.promptAddPipeline(flags.dashboard);

        CiCdHandler.generatePipeline(flags.dashboard ? 'front' : 'back', from, to, service);
    }
}
