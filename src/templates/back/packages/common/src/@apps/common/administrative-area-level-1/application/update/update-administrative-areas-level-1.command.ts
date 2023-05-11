import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class UpdateAdministrativeAreasLevel1Command
{
    constructor(
        public readonly payload: {
            id?: string;
            countryId?: string;
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