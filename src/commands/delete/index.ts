import * as path from 'node:path';
import * as fs from 'node:fs';
import * as chalk from 'chalk';
import * as inquirer from 'inquirer';
import * as emoji from 'node-emoji';
import * as logSymbols from 'log-symbols';
import { Args, Command, Flags } from '@oclif/core';
import { cliterConfig, FsExtend, TemplateElement } from '../../@cliter';

export default class Delete extends Command
{
    static description = 'Delete elements';

    static flags = {
        help: Flags.help({ char: 'h' }),
    };

    static args = {
        firstArg: Args.string({
            name       : 'elementType',
            description: 'Type element to delete',
            options    : ['bounded-context', 'b', 'module', 'm'],
            required   : true,
        }),
        secondArg: Args.string({
            name       : 'elementName',
            description: 'Name element to create',
            required   : true,
        }),
    };

    async run(): Promise<void>
    {
        const { args, flags } = await this.parse(Delete);

        if (args.firstArg === 'b') args.firstArg = TemplateElement.BACK_BOUNDED_CONTEXT;
        if (args.firstArg === 'm') args.firstArg = TemplateElement.BACK_APP;

        if (args.firstArg === TemplateElement.BACK_APP)
        {
            if (fs.existsSync(path.join(process.cwd(), 'src', cliterConfig.appContainer, args.secondArg)))
            {
                if ((await this.promptForDelete(args.secondArg)).hasDelete)
                {
                    FsExtend.rmDir(path.join(process.cwd(), 'src', cliterConfig.appContainer, args.secondArg));
                    this.log(`%s %s Module ${args.secondArg} has been deleted %s`, chalk.green.bold('DONE'), emoji.get('open_file_folder'), logSymbols.success);
                }
            }
            else
            {
                this.log(`%s Module ${args.secondArg} not exist, be sure to enter the module in the format: bounded-context/module %s`, chalk.yellow.bold('WARNING'), logSymbols.warning);
            }
        }
    }

    async promptForDelete(elementName: string)
    {
        const questions = [];

        questions.push({
            name   : 'hasDelete',
            message: `Do you want delete the module ${elementName}?`,
            type   : 'confirm',
        });

        return await inquirer.prompt(questions);
    }
}
