import { Command, Flags } from '@oclif/core';
import { Prompter } from '../@cliter';
import { CiCdHandler } from '../@cliter/handlers';

export default class Pipeline extends Command
{
    static description = 'Generate pipeline to deploy application in cloud';

    static flags =
    {
        help : Flags.help({ char: 'h' }),
        force: Flags.boolean({
            char       : 'f',
            description: 'Overwrite existing files.',
        }),
    };

    static args = [
        {
            name       : 'scope',
            required   : true,
            description: 'Scope where our command will act.',
            options    : [
                'back',
                'front',
            ],
        },
    ];

    static examples = [
        '$ aurora pipeline back',
        '$ aurora pipeline front -f',
        '$ aurora --help',
    ];

    public async run(): Promise<void>
    {
        const { args, flags } = await this.parse(Pipeline);

        const { from, to, service }: any = await Prompter.promptAddPipeline(args.scope);

        CiCdHandler.generatePipeline({
            command: this,
            scope  : args.scope,
            flags,
            from,
            to,
            service,
        });
    }
}
