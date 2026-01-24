import { CommonAdministrativeAreaLevel1Response } from '@app/common/administrative-area-level-1';
import { CommonCountryResponse } from '@app/common/country';

export class CommonAdministrativeAreaLevel2Response {
  constructor(
    public readonly id: string,
    public readonly countryId: string,
    public readonly administrativeAreaLevel1Id: string,
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
  ) {}
}
