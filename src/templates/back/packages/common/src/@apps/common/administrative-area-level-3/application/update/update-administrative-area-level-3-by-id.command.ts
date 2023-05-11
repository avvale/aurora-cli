import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

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