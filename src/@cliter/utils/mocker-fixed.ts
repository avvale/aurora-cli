import * as faker from 'faker';
import * as dayjs from 'dayjs';
import randomNumber from './random-number';

export class MockerFixed
{
    static mock(
        fieldType: string,
        fieldName: string,
        {
            length = undefined,
            maxLength = undefined,
            minLength = undefined,
            scapeQuotes = false,
            checkFieldNameMeaning = false,
            totalDigits = undefined,
            decimalDigits = undefined,
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
            const mockByFieldNameMeaning = MockerFixed.mockByFieldNameMeaning(fieldType, fieldName);
            if (mockByFieldNameMeaning) return mockByFieldNameMeaning;
        }

        switch (fieldType)
        {
            case 'id':
            case 'datatype.uuid':
                if (!length) length = 1;
                if (length !== 36) return '*'.repeat(length);
                return faker.datatype.uuid();

            case 'boolean':
                return faker.datatype.boolean();

            case 'relationship':
                return '[]';

            case 'json':
            case 'jsonb':
                return scapeQuotes ? '{ "foo" : "bar" }'.replace(/"/gi, '\\"') : '{ "foo" : "bar" }';

            case 'json.array':
                return scapeQuotes ? '["foo", "bar"]'.replace(/"/gi, '\\"') : '["foo", "bar"]';

            case 'json.availableLangs':
                // add spanish language
                return scapeQuotes ? '["4470b5ab-9d57-4c9d-a68f-5bf8e32f543a"]'.replace(/"/gi, '\\"') : '["4470b5ab-9d57-4c9d-a68f-5bf8e32f543a"]';

            case 'text':
                return faker.lorem.paragraph();

            case 'char':
                if (!length) length = 1;
                return '*'.repeat(length);

            case 'varchar':
            case 'password':
            case 'random.alphaNumeric':
                if (!maxLength) maxLength = 1;
                return '*'.repeat(maxLength);

            case 'encrypted':
                return '*'.repeat(50);

            case 'tinyint':
            case 'tinyint.unsigned':
                if (!maxLength) maxLength = 2;
                return Number.parseInt('1'.repeat(maxLength));

            case 'int':
            case 'int.unsigned':
                if (!maxLength) maxLength = 6;
                return Number.parseInt('1'.repeat(maxLength));

            case 'bigint':
            case 'bigint.unsigned':
                if (!maxLength) maxLength = 20;
                return Number.parseInt('1'.repeat(maxLength));

            case 'smallint':
            case 'smallint.unsigned':
                if (!maxLength) maxLength = 4;
                return Number.parseInt('1'.repeat(maxLength));

            case 'decimal':
                return totalDigits && decimalDigits ? ('1'.repeat(totalDigits - decimalDigits) + '.' + '1'.repeat(decimalDigits)) : Number.parseFloat('1'.repeat(5) + '.' + '1'.repeat(2));

            case 'random.float':
                return maxLength ? randomNumber(maxLength) : faker.datatype.float();

            case 'timestamp':
            case 'timestamp.recent':
                return '2022-01-01 00:00:00';

            case 'date':
                return '2022-01-01';

            case 'array':
                return '[]';

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

    private static mockByFieldNameMeaning(fieldType: string, fieldName: string): string | number | boolean | undefined
    {
        switch (fieldName)
        {
            case 'image':
                if (fieldType === 'varchar') return faker.image.image();
                break;

            case 'name':
                if (fieldType === 'varchar') return faker.commerce.productName();
                break;

            case 'slug':
                if (fieldType === 'varchar') return faker.lorem.slug();
                break;
        }
    }
}
