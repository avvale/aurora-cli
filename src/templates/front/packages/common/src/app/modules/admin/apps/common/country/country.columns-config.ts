/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const countryColumnsConfig: (properties?: {
  translator?: TranslocoService;
}) => ColumnConfig[] = ({
  translator = null,
}: {
  translator?: TranslocoService;
} = {}): ColumnConfig[] => [
  {
    type: ColumnDataType.STRING,
    field: 'id',
    sort: 'id',
    translation: 'Id',
    hidden: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'name',
    sort: 'name',
    translation: 'common.Name',
  },
  {
    type: ColumnDataType.STRING,
    field: 'slug',
    sort: 'slug',
    translation: 'common.Slug',
  },
  {
    type: ColumnDataType.STRING,
    field: 'iso3166Alpha2',
    sort: 'iso3166Alpha2',
    translation: 'common.Iso3166Alpha2',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'iso3166Alpha3',
    sort: 'iso3166Alpha3',
    translation: 'common.Iso3166Alpha3',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'iso3166Numeric',
    sort: 'iso3166Numeric',
    translation: 'common.Iso3166Numeric',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'customCode',
    sort: 'customCode',
    translation: 'common.CustomCode',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'prefix',
    sort: 'prefix',
    translation: 'common.Prefix',
  },
  {
    type: ColumnDataType.NUMBER,
    field: 'sort',
    sort: 'sort',
    translation: 'common.Sort',
  },
  {
    type: ColumnDataType.STRING,
    field: 'administrativeAreaLevel1',
    sort: 'administrativeAreaLevel1',
    translation: 'common.AdministrativeAreaLevel1',
  },
  {
    type: ColumnDataType.STRING,
    field: 'administrativeAreaLevel2',
    sort: 'administrativeAreaLevel2',
    translation: 'common.AdministrativeAreaLevel2',
  },
  {
    type: ColumnDataType.STRING,
    field: 'administrativeAreaLevel3',
    sort: 'administrativeAreaLevel3',
    translation: 'common.AdministrativeAreaLevel3',
  },
  {
    type: ColumnDataType.NUMBER,
    field: 'latitude',
    sort: 'latitude',
    translation: 'common.Latitude',
  },
  {
    type: ColumnDataType.NUMBER,
    field: 'longitude',
    sort: 'longitude',
    translation: 'common.Longitude',
  },
  {
    type: ColumnDataType.NUMBER,
    field: 'zoom',
    sort: 'zoom',
    translation: 'common.Zoom',
  },
  {
    type: ColumnDataType.ENUM,
    field: 'mapType',
    sort: 'mapType',
    translation: 'common.MapType',
  },
  {
    type: ColumnDataType.STRING,
    field: 'image',
    sort: 'image',
    translation: 'common.Image',
  },
];
