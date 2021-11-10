import { Command, flags } from '@oclif/command';
import * as fs from 'fs';
import * as chalk from 'chalk';
import * as inquirer from 'inquirer';
import * as path from 'path';
import * as emoji from 'node-emoji';
import * as logSymbols from 'log-symbols';
import { FsExtend } from './../@cliter/utils';
import { TemplateElement } from './../@cliter/types';
import { cliterConfig } from './../@cliter/config/cliter.config';

export default class Delete extends Command
{
    static description = 'Delete elements';

    static flags = {
        help: flags.help({ char: 'h' })
    };

    static args = [
        {
            name       : 'elementType',
            required   : true,
            description: 'Type element to delete',
            options    : ['bounded-context', 'b', 'module', 'm']
        },
        {
            name       : 'elementName',
            required   : true,
            description: 'Name element to create'
        }
    ];

    async run(): Promise<void>
    {
        const { args, flags } = this.parse(Delete);

        if (args.elementType === 'b') args.elementType = 'bounded-context';
        if (args.elementType === 'm') args.elementType = 'module';

        if (args.elementType === TemplateElement.MODULE)
        {
            if (fs.existsSync(path.join(process.cwd(), 'src', cliterConfig.applicationsContainer, args.elementName)))
            {
                if ((await this.promptForDelete(args.elementName)).hasDelete)
                {
                    FsExtend.rmDir(path.join(process.cwd(), 'src', cliterConfig.applicationsContainer, args.elementName));
                    this.log(`%s %s Module ${args.elementName} has been deleted %s`, chalk.green.bold('DONE'), emoji.get('open_file_folder'), logSymbols.success);
                }
            }
            else
            {
                this.log(`%s Module ${args.elementName} not exist, be sure to enter the module in the format: bounded-context/module %s`, chalk.yellow.bold('WARNING'), logSymbols.warning);
            }
        }
    }

    async promptForDelete(elementName: string)
    {
        const questions = [];

        questions.push({
            name   : 'hasDelete',
            message: `Do you want delete the module ${elementName}?`,
            type   : 'confirm'
        });

        return await inquirer.prompt(questions);
    }
}
