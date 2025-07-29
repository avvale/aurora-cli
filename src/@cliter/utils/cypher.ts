import * as dayjs from 'dayjs';
import * as crypto from 'node:crypto';
declare const Buffer: any;

export class Cypher
{
    public static nowTimestamp(): string
    {
        return dayjs().format('YYYY-MM-DD h:mm:ss');
    }

    public static sha1(data: string): string
    {
        const generator = crypto.createHash('sha1');
        generator.update(data);

        return generator.digest('hex');
    }

    public static base64Encode(data: string): string
    {
        return Buffer.from(data).toString('base64');
    }

    public static base64Decode(data: string): string
    {
        return Buffer.from(data, 'base64').toString('utf-8');
    }
}
