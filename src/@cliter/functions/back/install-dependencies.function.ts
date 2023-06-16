import { ux } from '@oclif/core';
import { exec } from '../common';

export const installDependencies = async (
    targetFolder: string,
): Promise<void> =>
{
    ux.action.start('Installing dependencies');
    await exec('npm', ['install'], {
        cwd    : targetFolder,
        verbose: false,
        onClose: () => ux.action.stop('Completed!'),
    });
};
