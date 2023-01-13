import { CliUx } from '@oclif/core';
import * as shell from 'node:child_process';

export const installDependencies = (targetFolder: string): void =>
{
    CliUx.ux.action.start('Installing dependencies');

    const install = shell.spawn('npm', ['install'], { cwd: targetFolder, timeout: 300 * 100 });

    install.stdout.on('data', data => console.log(`${data}`));

    install.stderr.on('data', data => console.error(`${data}`));

    install.on('error', err => console.error(`${err}`));
};
