/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonCountryResponse } from '@app/common/country';

export class CommonAdministrativeAreaLevel1Response {
  constructor(
    public readonly id: string,
    public readonly rowId: number,
    public readonly countryId: string,
    public readonly code: string,
    public readonly customCode: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly zoom: number,
    public readonly mapType: 'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN',
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly deletedAt: string,
    public readonly country: CommonCountryResponse,
  ) {}
}
