import * as faker from 'faker';
import * as dayjs from 'dayjs';
import { Property } from './../../utils/property';

export function fakerHelper(command: string, params: (string|number)[] = []): string | number | boolean | undefined
{
    switch (command)
    {
        case 'datatype.uuid':
            if (params.length > 0 && typeof params[0] === 'number' && params[0] !== 36) return faker.random.alphaNumeric(params[0]);
            return faker.datatype.uuid();

        case 'datatype.boolean':
            return faker.datatype.boolean();

        case 'datatype.json':
            return faker.datatype.json();

        case 'random.alphaNumeric':
            return faker.random.alphaNumeric(...<number[]>params);

        case 'database.column':
            if (params.length > 0 && typeof params[0] === 'number') return faker.random.alphaNumeric(params[0]);
            return faker.database.column();

        case 'lorem.paragraph':
            if (params.length > 0 && typeof params[0] === 'number') return faker.random.alphaNumeric(params[0]);
            return faker.lorem.paragraph();

        case 'timestamp.recent':
            return dayjs(faker.date.recent()).format('YYYY-MM-DD HH:mm:ss');

        case 'random.number.length':
            return Math.floor(+(1 + '0'.repeat(<number>params[0]-1)) + Math.random() * +(9 + '0'.repeat(<number>params[0]-1)));

        case 'random.float.length':
            return !!params[0] ? Math.floor(+(1 + '0'.repeat(<number>params[0]-1)) + Math.random() * +(9 + '0'.repeat(<number>params[0]-1))) : faker.datatype.float();

        default:
            throw new Error(`
                Command Faker ${command} not recognized, check FakeJs API:
                https://github.com/marak/Faker.js/
            `);
    }
}

export function fakerByPropertyType(property: Property, params: (string|number)[] = [])
{
    let fakerMethod = '';
    switch (property.type)
    {
        case 'id':
            fakerMethod = 'datatype.uuid';
            break;
        case 'varchar':
        case 'char':
        case 'enum':
        case 'password':
            fakerMethod = 'random.alphaNumeric';
            break;
        case 'text':
            fakerMethod = 'lorem.paragraph';
            break;
        case 'boolean':
            fakerMethod = 'datatype.boolean';
            break;
        case 'timestamp':
            fakerMethod = 'timestamp.recent';
            break;
        case 'int':
        case 'int.unsigned':
        case 'smallint':
        case 'smallint.unsigned':
            fakerMethod = 'random.number.length';
            break;
        case 'float':
        case 'decimal':
            fakerMethod = 'random.float.length';
            break;
        case 'json':
            fakerMethod = 'datatype.json';
            break;
    }

    return fakerHelper(fakerMethod, params);
}

export function getFakerHelperParams(options: any[], property?: Property): any[]
{
    const parameters = [];
    let hasFirstParameter = false;

    for (const option of options)
    {
        if (
            !(option instanceof Object && (option.name === 'fakerProperty' || option.name === 'faker')) && // avoid add handlebars property
            option !== 'seed' // avoid add seed command
        )
        {
            parameters.push(option);
            hasFirstParameter = true;
        }

        // active seed property to generate same values for this value
        if (option === 'seed') faker.seed(123456);
    }

    // add length or maxLength how first parameter if has not first parameter
    if (!hasFirstParameter && !!(property?.maxLength ? property.maxLength : property?.length)) parameters.push(property?.maxLength ? property.maxLength : property?.length);

    return parameters;
}