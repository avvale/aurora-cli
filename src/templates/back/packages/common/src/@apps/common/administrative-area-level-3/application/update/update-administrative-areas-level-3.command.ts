import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';

export class UpdateAdministrativeAreasLevel3Command
{
    constructor(
        public readonly payload: {
            id?: string;
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
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}