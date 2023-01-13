import { CountryResponse } from '@app/common/country/domain/country.response';
import { AdministrativeAreaLevel1Response } from '@app/common/administrative-area-level-1/domain/administrative-area-level-1.response';
import { AdministrativeAreaLevel2Response } from '@app/common/administrative-area-level-2/domain/administrative-area-level-2.response';

export class AdministrativeAreaLevel3Response
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
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly country: CountryResponse,
        public readonly administrativeAreaLevel1: AdministrativeAreaLevel1Response,
        public readonly administrativeAreaLevel2: AdministrativeAreaLevel2Response,
    ) {}
}