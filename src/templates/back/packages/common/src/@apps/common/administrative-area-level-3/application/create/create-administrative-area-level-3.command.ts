import { CQMetadata } from '@aurorajs.dev/core';

export class CreateAdministrativeAreaLevel3Command
{
    constructor(
        public readonly payload: {
            id: string;
            countryId: string;
            administrativeAreaLevel1Id: string;
            administrativeAreaLevel2Id: string;
            code: string;
            customCode?: string;
            name: string;
            slug: string;
            latitude?: number;
            longitude?: number;
            zoom?: number;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}