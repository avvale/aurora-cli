import { ClientResponse } from '@app/o-auth/client/domain/client.response';

export class ApplicationResponse
{
    constructor(
        public readonly id: string,
        public readonly code: string,
        public readonly name: string,
        public readonly secret: string,
        public readonly isMaster: boolean,
        public readonly clientIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly clients: ClientResponse[],
    ) {}
}