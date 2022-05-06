import { DeletedClientEvent } from './deleted-client.event';

export class DeletedClientsEvent
{
    constructor(
        public readonly clients: DeletedClientEvent[],
    ) {}
}