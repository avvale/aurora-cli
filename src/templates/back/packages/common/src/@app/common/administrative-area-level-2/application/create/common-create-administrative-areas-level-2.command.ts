import { CQMetadata } from '@aurorajs.dev/core';

export class  CommonCreateAdministrativeAreasLevel2Command
{
    constructor(
        public readonly payload: {
            id: string;
            countryId: string;
            administrativeAreaLevel1Id: string;
            code: string;
            customCode?: string;
            name: string;
            slug: string;
            latitude?: number;
            longitude?: number;
            zoom?: number;
            mapType: string;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}