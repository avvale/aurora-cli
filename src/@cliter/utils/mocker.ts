import * as faker from 'faker';
import * as dayjs from 'dayjs';

export class Mocker
{
    mock(
        fieldType: string,
        fieldName: string,
        {
            length = 0,
            maxLength = 0,
            minLength = 0,
            scapeQuotes = false,
            checkFieldNameMeaning = false,
        }: {
            length?: number;
            maxLength?: number;
            minLength?: number;
            scapeQuotes?: boolean;
            checkFieldNameMeaning?: boolean;
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
            /*  case 'datatype.uuid':
                if (params.length > 0 && typeof params[0] === 'number' && params[0] !== 36) return faker.random.alphaNumeric(params[0]);
                return faker.datatype.uuid(); */

            case 'id':
                return faker.datatype.uuid();

            case 'boolean':
                return faker.datatype.boolean();

            case 'relationship':
                return '[]';

            case 'json':
                return scapeQuotes ? '{ "foo" : "bar" }'.replace(/"/gi, '\\"') : '{ "foo" : "bar" }';

            case 'text':
                return faker.lorem.paragraph();

            case 'char':
                return faker.random.alphaNumeric(length);

            case 'varchar':
            case 'password':
            case 'random.alphaNumeric':
                return faker.random.alphaNumeric(maxLength);

            case 'int':
            case 'int.unsigned':
                if (length === 0) length = 10;
                return Math.floor(+(1 + '0'.repeat(length - 1)) + Math.random() * +(9 + '0'.repeat(length - 1)));

            case 'smallint':
            case 'smallint.unsigned':
                if (length === 0) length = 5;
                return Math.floor(+(1 + '0'.repeat(length - 1)) + Math.random() * +(9 + '0'.repeat(length - 1)));

            case 'decimal':
                return length ? Math.floor(+(1 + '0'.repeat(length-1)) + Math.random() * +(9 + '0'.repeat(length-1))) : faker.datatype.float();

            case 'random.float.length':
                return length ? Math.floor(+(1 + '0'.repeat(length-1)) + Math.random() * +(9 + '0'.repeat(length-1))) : faker.datatype.float();

            case 'timestamp':
            case 'timestamp.recent':
                return dayjs(faker.date.recent()).format('YYYY-MM-DD HH:mm:ss');

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