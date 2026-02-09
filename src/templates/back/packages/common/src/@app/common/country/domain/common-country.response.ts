/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { CommonLangResponse } from '@app/common/lang';

export class CommonCountryResponse {
  constructor(
    public readonly id: string,
    public readonly rowId: number,
    public readonly iso3166Alpha2: string,
    public readonly iso3166Alpha3: string,
    public readonly iso3166Numeric: string,
    public readonly customCode: string,
    public readonly prefix: string,
    public readonly image: string,
    public readonly sort: number,
    public readonly administrativeAreas: any,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly zoom: number,
    public readonly mapType: 'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN',
    public readonly availableLangs: any,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly deletedAt: string,
    public readonly langId: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly administrativeAreaLevel1: string,
    public readonly administrativeAreaLevel2: string,
    public readonly administrativeAreaLevel3: string,
    public readonly lang: CommonLangResponse,
  ) {}
}
