import { CreatedClientEvent } from './created-client.event';

export class CreatedClientsEvent
{
    constructor(
        public readonly clients: CreatedClientEvent[],
    ) {}
}