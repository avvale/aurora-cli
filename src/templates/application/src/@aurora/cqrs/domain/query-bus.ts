import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IQueryBus
{
    abstract ask<T>(command: T): Promise<any>;
}