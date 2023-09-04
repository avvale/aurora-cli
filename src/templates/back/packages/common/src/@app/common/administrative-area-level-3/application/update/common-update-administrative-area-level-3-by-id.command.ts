import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonUpdateAdministrativeAreaLevel3ByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            countryId?: string;
            administrativeAreaLevel1Id?: string;
            administrativeAreaLevel2Id?: string;
            code?: string;
            customCode?: string;
            name?: string;
            slug?: string;
            latitude?: number;
            longitude?: number;
            zoom?: number;
            mapType?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
