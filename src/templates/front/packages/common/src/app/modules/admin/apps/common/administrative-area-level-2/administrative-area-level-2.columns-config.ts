/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const administrativeAreaLevel2ColumnsConfig: (properties?: {
  translator?: TranslocoService;
}) => ColumnConfig[] = ({
  translator = null,
}: {
  translator?: TranslocoService;
} = {}): ColumnConfig[] => [
  {
    type: ColumnDataType.NUMBER,
    field: 'rowId',
    searchableField: '$CommonAdministrativeAreaLevel2.rowId$',
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
    field: 'administrativeAreaLevel1.name',
    searchableField: '$administrativeAreaLevel1.name$',
    sort: 'administrativeAreaLevel1.name',
    translation: 'common.AdministrativeAreaLevel1',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'code',
    searchableField: '$administrativeAreaLevel1.code$',
    sort: 'code',
    translation: 'common.Code',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'customCode',
    searchableField: '$administrativeAreaLevel1.customCode$',
    sort: 'customCode',
    translation: 'common.CustomCode',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'name',
    searchableField: '$administrativeAreaLevel1.name$',
    sort: 'name',
    translation: 'common.Name',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'slug',
    searchableField: '$administrativeAreaLevel1.slug$',
    sort: 'slug',
    translation: 'common.Slug',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.NUMBER,
    field: 'latitude',
    searchableField: '$administrativeAreaLevel1.latitude$',
    sort: 'latitude',
    translation: 'common.Latitude',
  },
  {
    type: ColumnDataType.NUMBER,
    field: 'longitude',
    searchableField: '$administrativeAreaLevel1.longitude$',
    sort: 'longitude',
    translation: 'common.Longitude',
  },
  {
    type: ColumnDataType.NUMBER,
    field: 'zoom',
    searchableField: '$administrativeAreaLevel1.zoom$',
    sort: 'zoom',
    translation: 'common.Zoom',
  },
  {
    type: ColumnDataType.ENUM,
    field: 'mapType',
    searchableField: '$administrativeAreaLevel1.mapType$',
    sort: 'mapType',
    translation: 'common.MapType',
  },
];
