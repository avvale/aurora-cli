import * as faker from 'faker';
import * as dayjs from 'dayjs';
import randomNumber from './random-number';
import randomDigitsDecimal from './random-decimal-digits';

export class Mocker
{
    mock(
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

            case 'json.dataLang':
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

            case 'int':
            case 'int.unsigned':
                if (!maxLength) maxLength = 6;
                return randomNumber(maxLength);

            case 'smallint':
            case 'smallint.unsigned':
                if (!maxLength) maxLength = 4;
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
