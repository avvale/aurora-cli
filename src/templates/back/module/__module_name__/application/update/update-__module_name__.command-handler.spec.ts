import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toCamelCase schema.moduleNames }} } from '../../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';
import { Update{{ toPascalCase schema.moduleName }}CommandHandler } from './update-{{ toKebabCase schema.moduleName }}.command-handler';
import { Update{{ toPascalCase schema.moduleName }}Command } from './update-{{ toKebabCase schema.moduleName }}.command';
import { Update{{ toPascalCase schema.moduleName }}Service } from './update-{{ toKebabCase schema.moduleName }}.service';

describe('Update{{ toPascalCase schema.moduleName }}CommandHandler', () =>
{
    let commandHandler: Update{{ toPascalCase schema.moduleName }}CommandHandler;
    let service: Update{{ toPascalCase schema.moduleName }}Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Update{{ toPascalCase schema.moduleName }}CommandHandler,
                {
                    provide : Update{{ toPascalCase schema.moduleName }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<Update{{ toPascalCase schema.moduleName }}CommandHandler>(Update{{ toPascalCase schema.moduleName }}CommandHandler);
        service         = module.get<Update{{ toPascalCase schema.moduleName }}Service>(Update{{ toPascalCase schema.moduleName }}Service);
    });

    describe('main', () =>
    {
        test('Update{{ toPascalCase schema.moduleName }}CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleName }} created', async () =>
        {
            expect(await commandHandler.execute(
                new Update{{ toPascalCase schema.moduleName }}Command(
                    {
                        {{#each schema.properties.updateController}}
                        {{ toCamelCase name }}: {{ toCamelCase ../schema.moduleNames }}[0].{{ toCamelCase name }},
                        {{/each}}
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});