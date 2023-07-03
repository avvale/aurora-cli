import { CommonCountryResponse } from '@app/common/country';
import { CommonAdministrativeAreaLevel1Response } from '@app/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel2Response } from '@app/common/administrative-area-level-2';

export class CommonAdministrativeAreaLevel3Response
{
    constructor(
        public readonly id: string,
        public readonly countryId: string,
        public readonly administrativeAreaLevel1Id: string,
        public readonly administrativeAreaLevel2Id: string,
        public readonly code: string,
        public readonly customCode: string,
        public readonly name: string,
        public readonly slug: string,
        public readonly latitude: number,
        public readonly longitude: number,
        public readonly zoom: number,
        public readonly mapType: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly country: CommonCountryResponse,
        public readonly administrativeAreaLevel1: CommonAdministrativeAreaLevel1Response,
        public readonly administrativeAreaLevel2: CommonAdministrativeAreaLevel2Response,
    ) {}
}