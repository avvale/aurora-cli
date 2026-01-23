import { Args, Command, Flags } from '@oclif/core';
import { Prompter } from '../@cliter';
import { AiHandler } from '../@cliter/handlers';

export default class Ai extends Command
{
    static description = 'Generate an agentic system to perform vibe coding';

    static flags =
    {
        help : Flags.help({ char: 'h' }),
        force: Flags.boolean({
            char       : 'f',
            description: 'Overwrite existing files.',
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
    };

    static examples = [
        '$ aurora ai back',
        '$ aurora ai front -f',
        '$ aurora --help',
    ];

    public async run(): Promise<void>
    {
        const { args, flags } = await this.parse(Ai);

        const { from, to, service }: any = await Prompter.promptAddPipeline(args.firstArg);

        AiHandler.generateAi({
            command: this,
            scope  : args.firstArg,
            flags,
            from,
            to,
            service,
        });
    }
}
