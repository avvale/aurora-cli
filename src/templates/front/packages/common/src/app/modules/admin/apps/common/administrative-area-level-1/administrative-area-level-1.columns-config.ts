/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const administrativeAreaLevel1ColumnsConfig: (properties?: {
  translator?: TranslocoService;
}) => ColumnConfig[] = ({
  translator = null,
}: {
  translator?: TranslocoService;
} = {}): ColumnConfig[] => [
  {
    type: ColumnDataType.NUMBER,
    field: 'rowId',
    searchableField: '$CommonAdministrativeAreaLevel1.rowId$',
    sort: 'rowId',
    translation: 'common.RowId',
  },
  {
    type: ColumnDataType.STRING,
    field: 'country.name',
    searchableField: '$country.countryI18n.name$',
    sort: 'country.name',
    translation: 'common.Country',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'code',
    sort: 'code',
    translation: 'common.Code',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'customCode',
    searchableField: '$CommonAdministrativeAreaLevel1.customCode$',
    sort: 'customCode',
    translation: 'common.CustomCode',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'name',
    searchableField: '$CommonAdministrativeAreaLevel1.name$',
    sort: 'name',
    translation: 'common.Name',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'slug',
    searchableField: '$CommonAdministrativeAreaLevel1.slug$',
    sort: 'slug',
    translation: 'common.Slug',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.NUMBER,
    field: 'latitude',
    searchableField: '$CommonAdministrativeAreaLevel1.latitude$',
    sort: 'latitude',
    translation: 'common.Latitude',
  },
  {
    type: ColumnDataType.NUMBER,
    field: 'longitude',
    searchableField: '$CommonAdministrativeAreaLevel1.longitude$',
    sort: 'longitude',
    translation: 'common.Longitude',
  },
  {
    type: ColumnDataType.NUMBER,
    field: 'zoom',
    searchableField: '$CommonAdministrativeAreaLevel1.zoom$',
    sort: 'zoom',
    translation: 'common.Zoom',
  },
  {
    type: ColumnDataType.ENUM,
    field: 'mapType',
    searchableField: '$CommonAdministrativeAreaLevel1.mapType$',
    sort: 'mapType',
    translation: 'common.MapType',
  },
];
