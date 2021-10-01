import 'reflect-metadata';
import { Command, flags } from '@oclif/command'

export default class Key extends Command
{
    static description = 'Test command';

    static flags = {
        help: flags.help({ char: 'h' })
    };

    static args = [];

    async run()
    {
        const { args, flags } = this.parse(Key);

        console.log('Hello!!');
    }
}
