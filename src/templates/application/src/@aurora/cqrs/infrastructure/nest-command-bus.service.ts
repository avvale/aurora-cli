import { Injectable } from '@nestjs/common';
import { CommandBus as NestCommandBusImplementation, ICommand } from '@nestjs/cqrs';
import { ICommandBus } from './../domain/command-bus';

@Injectable()
export class NestCommandBus implements ICommandBus
{
    constructor(
        private readonly commandBus: NestCommandBusImplementation
    ) {}

    async dispatch<T extends ICommand>(command: T): Promise<any>
    {
        return await this.commandBus.execute(command);
    }
}
