/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const administrativeAreaLevel3ColumnsConfig: (properties?: {
  translator?: TranslocoService;
}) => ColumnConfig[] = ({
  translator = null,
}: {
  translator?: TranslocoService;
} = {}): ColumnConfig[] => [
  {
    type: ColumnDataType.NUMBER,
    field: 'rowId',
    sort: 'rowId',
    translation: 'common.RowId',
  },
  {
    type: ColumnDataType.STRING,
    field: 'country.name',
    searchableField: '$country.name$',
    sort: 'country.name',
    translation: 'Name',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'administrativeAreaLevel1.name',
    searchableField: '$administrativeAreaLevel1.name$',
    sort: 'administrativeAreaLevel1.name',
    translation: 'Name',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'administrativeAreaLevel2.name',
    searchableField: '$administrativeAreaLevel2.name$',
    sort: 'administrativeAreaLevel2.name',
    translation: 'Name',
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
    sort: 'customCode',
    translation: 'common.CustomCode',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'name',
    sort: 'name',
    translation: 'common.Name',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'slug',
    sort: 'slug',
    translation: 'common.Slug',
    isUnaccent: true,
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
];
