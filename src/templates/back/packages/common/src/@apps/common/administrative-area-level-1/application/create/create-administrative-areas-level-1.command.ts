import { CQMetadata } from '@aurorajs.dev/core';

export class CreateAdministrativeAreasLevel1Command
{
    constructor(
        public readonly payload: {
            id: string;
            countryId: string;
            code: string;
            customCode?: string;
            name: string;
            slug: string;
            latitude?: number;
            longitude?: number;
            zoom?: number;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}