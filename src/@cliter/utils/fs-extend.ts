import * as fs from 'node:fs';

// extend file system class to improve methods
export class FsExtend
{
    static rmDir(path: string): void
    {
        if (fs.existsSync(path))
        {
            fs.readdirSync(path).forEach(function(file,index)
            {
                const curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory())
                {
                    FsExtend.rmDir(curPath);
                }
                else
                {
                    // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
}