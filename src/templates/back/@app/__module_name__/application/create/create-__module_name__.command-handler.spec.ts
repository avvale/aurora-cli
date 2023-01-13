import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';
import { Create{{ toPascalCase schema.moduleName }}CommandHandler } from './create-{{ toKebabCase schema.moduleName }}.command-handler';
import { Create{{ toPascalCase schema.moduleName }}Command } from './create-{{ toKebabCase schema.moduleName }}.command';
import { Create{{ toPascalCase schema.moduleName }}Service } from './create-{{ toKebabCase schema.moduleName }}.service';

describe('Create{{ toPascalCase schema.moduleName }}CommandHandler', () =>
{
    let commandHandler: Create{{ toPascalCase schema.moduleName }}CommandHandler;
    let service: Create{{ toPascalCase schema.moduleName }}Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Create{{ toPascalCase schema.moduleName }}CommandHandler,
                {
                    provide : Create{{ toPascalCase schema.moduleName }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<Create{{ toPascalCase schema.moduleName }}CommandHandler>(Create{{ toPascalCase schema.moduleName }}CommandHandler);
        service         = module.get<Create{{ toPascalCase schema.moduleName }}Service>(Create{{ toPascalCase schema.moduleName }}Service);
    });

    describe('main', () =>
    {
        test('Create{{ toPascalCase schema.moduleName }}CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the Create{{ toPascalCase schema.moduleName }}Service', async () =>
        {
            expect(await commandHandler.execute(
                new Create{{ toPascalCase schema.moduleName }}Command(
                    {
                        {{#each schema.properties.createController}}
                        {{ toCamelCase name }}: {{ toCamelCase ../schema.moduleNames }}[0].{{ toCamelCase name }},
                        {{/each}}
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});