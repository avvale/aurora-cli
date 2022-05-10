import { UpdatedClientEvent } from './updated-client.event';

export class UpdatedClientsEvent
{
    constructor(
        public readonly clients: UpdatedClientEvent[],
    ) {}
}