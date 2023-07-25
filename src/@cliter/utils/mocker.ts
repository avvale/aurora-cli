import * as faker from 'faker';
import * as dayjs from 'dayjs';
import randomNumber from './random-number';
import randomDigitsDecimal from './random-decimal-digits';

export class Mocker
{
    // eslint-disable-next-line complexity
    mock(
        fieldType: string,
        fieldName: string,
        {
            length,
            maxLength,
            minLength,
            scapeQuotes = false,
            checkFieldNameMeaning = false,
            totalDigits,
            decimalDigits,
        }: {
            length?: number;
            maxLength?: number;
            minLength?: number;
            scapeQuotes?: boolean;
            checkFieldNameMeaning?: boolean;
            totalDigits?: number;
            decimalDigits?: number;
        } = {}): string | number | boolean | undefined
    {
        // according to the meaning of the field use a faker function to obtain the mock
        if (checkFieldNameMeaning)
        {
            const mockByFieldNameMeaning = this.mockByFieldNameMeaning(fieldName);
            if (mockByFieldNameMeaning) return mockByFieldNameMeaning;
        }

        switch (fieldType)
        {
            case 'id':
            case 'datatype.uuid':
                if (length !== 36) return faker.random.alphaNumeric(length);
                return faker.datatype.uuid();

            case 'boolean':
                return faker.datatype.boolean();

            case 'relationship':
                return '[]';

            case 'json':
                return scapeQuotes ? '{ "foo" : "bar" }'.replace(/"/gi, '\\"') : '{ "foo" : "bar" }';

            case 'json.array':
                return scapeQuotes ? '["foo", "bar"]'.replace(/"/gi, '\\"') : '["foo", "bar"]';

            case 'json.availableLangs':
                // add spanish language
                return scapeQuotes ? '["4470b5ab-9d57-4c9d-a68f-5bf8e32f543a"]'.replace(/"/gi, '\\"') : '["4470b5ab-9d57-4c9d-a68f-5bf8e32f543a"]';

            case 'text':
                return faker.lorem.paragraph();

            case 'char':
                return faker.random.alphaNumeric(length);

            case 'varchar':
            case 'password':
            case 'random.alphaNumeric':
                return faker.random.alphaNumeric(maxLength);

            case 'tinyint':
            case 'tinyint.unsigned':
                if (!maxLength) maxLength = 2;
                return randomNumber(maxLength);

            case 'smallint':
            case 'smallint.unsigned':
                if (!maxLength) maxLength = 4;
                return randomNumber(maxLength);

            case 'int':
            case 'int.unsigned':
                if (!maxLength) maxLength = 6;
                return randomNumber(maxLength);

            case 'bigint':
            case 'bigint.unsigned':
                if (!maxLength) maxLength = 20;
                return randomNumber(maxLength);

            case 'decimal':
                return totalDigits && decimalDigits ? randomDigitsDecimal(totalDigits, decimalDigits) : randomDigitsDecimal(5, 2);

            case 'random.float':
                return maxLength ? randomNumber(maxLength) : faker.datatype.float();

            case 'timestamp':
            case 'timestamp.recent':
                return dayjs(faker.date.recent()).format('YYYY-MM-DD HH:mm:ss');

            case 'date':
                return dayjs(faker.date.recent()).format('YYYY-MM-DD');

            case 'blob.long':
            case 'blob.medium':
            case 'blob.tiny':
            case 'blob':
                return 'data:image/png;base64,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';

            default:
                throw new Error(`
                    Command Faker ${fieldType} not recognized, check FakeJs API:
                    https://github.com/marak/Faker.js/
                `);

            /* case 'database.column':
                if (params.length > 0 && typeof params[0] === 'number') return faker.random.alphaNumeric(params[0]);
                return faker.database.column();

            case 'lorem.paragraph':
                if (params.length > 0 && typeof params[0] === 'number') return faker.random.alphaNumeric(params[0]);
                return faker.lorem.paragraph();

            case 'random.number.length':
                return Math.floor(+(1 + '0'.repeat(params[0] as number - 1) )) + Math.random() * +(9 + '0'.repeat(params[0] as number- 1)));
            */
        }
    }

    mockByFieldNameMeaning(fieldName: string): string | number | boolean | undefined
    {
        switch (fieldName)
        {
            case 'image':
                return faker.image.image();

            case 'name':
                return faker.commerce.productName();

            case 'slug':
                return faker.lorem.slug();
        }
    }
}
