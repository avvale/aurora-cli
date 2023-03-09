import * as shell from 'node:child_process';

export const exec = async(
    command: string,
    args: string[],
    {
        cwd = process.cwd(),
        verbose = false,
    }: {
        cwd?: string;
        verbose?: boolean;
    } = {},
): Promise<number | null | undefined> =>
{
    try
    {
        return new Promise((resolve, reject) =>
        {
            const process = shell.spawn(command, args, { cwd });
            process.stdout.on('data', data => verbose && console.log(`${data}`));
            process.stderr.on('data', data => verbose && console.error(`${data}`));
            process.on('error', err => reject(err));
            process.on('close', code => resolve(code));
        });
    }
    catch (error)
    {
        console.error(error);
    }
};
