/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const langColumnsConfig: (properties?: {
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
    field: 'name',
    sort: 'name',
    translation: 'common.Name',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'image',
    sort: 'image',
    translation: 'common.Image',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'iso6392',
    sort: 'iso6392',
    translation: 'common.Iso6392',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'iso6393',
    sort: 'iso6393',
    translation: 'common.Iso6393',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.STRING,
    field: 'ietf',
    sort: 'ietf',
    translation: 'common.Ietf',
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
    type: ColumnDataType.ENUM,
    field: 'dir',
    sort: 'dir',
    translation: 'common.Dir',
  },
  {
    type: ColumnDataType.NUMBER,
    field: 'sort',
    sort: 'sort',
    translation: 'common.Sort',
  },
  {
    type: ColumnDataType.BOOLEAN,
    field: 'isActive',
    sort: 'isActive',
    translation: 'common.IsActive',
  },
];
