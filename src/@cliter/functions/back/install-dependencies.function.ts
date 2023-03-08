import { ux } from '@oclif/core';
import * as execa from 'execa';
//import * as shell from 'node:child_process';

export const installDependencies = async (targetFolder: string): Promise<void> =>
{
    try
    {
        ux.action.start('Installing dependencies');
        const { stdout } = await execa.execa('echo', ['unicorns'], { cwd: targetFolder });

        console.log(stdout);
    }
    catch (error)
    {
        console.log(error);
    }

    /* const install = shell.spawn('npm', ['install'], { cwd: targetFolder });

    install.stdout.on('data', data => console.log(`${data}`));

    install.stderr.on('data', data => console.error(`${data}`));

    install.on('error', err => console.error(`${err}`)); */
};
