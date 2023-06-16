import { spawn } from 'node:child_process';

export const exec = async(
    command: string,
    args: string[],
    {
        cwd = process.cwd(),
        verbose = false,
        shell = true,
        onStdout = (data: string) => verbose && console.log(`${data}`),
        onStderr = (data: string) => verbose && console.error(`${data}`),
        onError = (error: Error) => verbose && console.error(error),
        onClose = (code: number | null | undefined) => verbose && console.log(`child process exited with code ${code}`),
    }: {
        cwd?: string;
        verbose?: boolean;
        shell?: boolean;
        onStdout?: (data: string) => void;
        onStderr?: (data: string) => void;
        onError?: (error: Error) => void;
        onClose?: (code: number | null | undefined) => void;
    } = {},
): Promise<number | null | undefined> =>
{
    try
    {
        return new Promise((resolve, reject) =>
        {
            const process = spawn(command, args, { cwd, shell });
            process.stdout.on('data', onStdout);
            process.stderr.on('data', onStderr);

            process.on('error', error =>
            {
                onError(error);
                return reject(error);
            });

            process.on('close', code =>
            {
                onClose(code);
                return resolve(code);
            });
        });
    }
    catch (error)
    {
        console.error(error);
    }
};
