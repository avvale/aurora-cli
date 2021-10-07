import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ICommandBus
{
    abstract dispatch<T>(command: T): Promise<any>;
}