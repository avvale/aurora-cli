import { Command, flags } from '@oclif/command';
import { TemplateElement } from './../@cliter/types';
import { Operations, Prompter } from './../@cliter/utils';
import { cliterConfig } from './../@cliter/config/cliter.config';
import * as fs from 'fs';
import * as chalk from 'chalk';
import * as path from 'path';
import * as emoji from 'node-emoji';
import * as logSymbols from 'log-symbols';
import * as shell from 'shelljs';
import * as ora from 'ora';

export default class Seed extends Command
{
    static description = 'Seed database with bounded context or module selected';

    static flags = {
        help          : flags.help({ char: 'h' }),
        module        : flags.string({ char: 'm' }),
        boundedContext: flags.string({ char: 'b' }),
        log           : flags.boolean({ char: 'l' }),
    };

    static args = [
        {
            name       : 'elementType',
            required   : true,
            description: 'Type element to create',
            options    : ['bounded-context', 'b', 'module', 'm']
        }
    ];

    async run()
    {
        const { args, flags } = this.parse(Seed);

        if (args.elementType === 'b') args.elementType = 'bounded-context';
        if (args.elementType === 'm') args.elementType = 'module';

        if (args.elementType === TemplateElement.MODULE)
        {
            let moduleFlag: any = {};
            if (flags.module) moduleFlag = Operations.parseFlagOfBoundedContextAndModule(this, flags.module);

            const { boundedContextName, moduleName }: any = await Prompter.promptForSeedModule(moduleFlag?.boundedContextName, moduleFlag?.moduleName);

            const seederPath = path.join('src', cliterConfig.apiContainer, boundedContextName, moduleName, 'seeder', 'seeder.ts');

            // check if seeder class exists in @api tree folders
            if (fs.existsSync(path.join(process.cwd(), seederPath)))
            {
                const environmentSpinner = ora('Creating environment').start();
                shell.exec(`ts-node -r tsconfig-paths/register ${seederPath}`, { silent: !flags.log, async: true }, () =>
                {
                    environmentSpinner.succeed('Environment created');
                    this.log(`%s %s Module seed ${moduleName} has been loaded %s`, chalk.green.bold('DONE'), emoji.get('open_file_folder'), logSymbols.success);
                });
            }
            else
            {
                this.log(`%s Module ${moduleName} does not contain seed to run %s`, chalk.yellow.bold('WARNING'), logSymbols.warning);
            }
        }

        if (args.elementType.toKebabCase() === TemplateElement.BOUNDED_CONTEXT)
        {
            const { boundedContextName }: any = await Prompter.promptForSeedBoundedContext(flags.boundedContext);

            const seederPath = path.join('src', cliterConfig.apiContainer, boundedContextName, 'seeder', 'seeder.ts');

            // check if seeder class exists in @api tree folders
            if (fs.existsSync(path.join(process.cwd(), seederPath)))
            {
                const environmentSpinner = ora('Creating environment').start();
                shell.exec(`ts-node -r tsconfig-paths/register ${seederPath}`, { silent: !flags.log, async: true }, () =>
                {
                    environmentSpinner.succeed('Environment created');
                    this.log(`%s %s Bounded Context seed ${boundedContextName} has been loaded %s`, chalk.green.bold('DONE'), emoji.get('open_file_folder'), logSymbols.success);
                });
            }
            else
            {
                this.log(`%s Bounded Context ${boundedContextName} does not contain seed to run %s`, chalk.yellow.bold('WARNING'), logSymbols.warning);
            }
        }
    }
}
