import { ColumnConfig } from '../grid.types';

export const adaptColumnsConfigForSerialization = (columnsConfig: ColumnConfig[]): ColumnConfig[] =>
{
    return columnsConfig
        .map(columnConfig =>
        {
            // we avoid serialize meta property because it can contain functions
            // and get error TypeError: Converting circular structure to JSON
            if (columnConfig.meta)
            {
                columnConfig = { ...columnConfig };
                delete columnConfig.meta;
            }
            return columnConfig;
        });
};