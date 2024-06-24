import { utils, WorkBook, WorkSheet, writeFile } from 'xlsx';
import { pick } from 'lodash-es';
import { ExportFormat } from './grid.types';

export const exportRows = (
    rows: any[],
    filename: string,
    columns: string[],
    headers: string[],
    format: ExportFormat,
): void =>
{
    // create worksheet from JSON Array data, filtered for columns defined
    const workSheet: WorkSheet = utils.json_to_sheet(
        rows.map(row => pick(row, columns)), // only get data from defined columns
        { header: columns },
    );

    // init new workbook
    const workBook: WorkBook = utils.book_new();

    // insert array of headers translated into A1, replacing the header with the field names
    utils.sheet_add_aoa(workSheet, [headers], { origin: 'A1' });

    // append the worksheet to the workbook
    utils.book_append_sheet(workBook, workSheet, 'DATA');

    // Generate and attempt to save file
    writeFile(
        workBook,
        filename,
        {
            bookType: format,
            type    : 'array',
        },
    );
};