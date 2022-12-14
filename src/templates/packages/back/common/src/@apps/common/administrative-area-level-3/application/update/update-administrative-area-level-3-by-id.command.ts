import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';

export class UpdateAdministrativeAreaLevel3ByIdCommand
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
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}