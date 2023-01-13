import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';
import { Upsert{{ toPascalCase schema.moduleName }}CommandHandler } from './upsert-{{ toKebabCase schema.moduleName }}.command-handler';
import { Upsert{{ toPascalCase schema.moduleName }}Command } from './upsert-{{ toKebabCase schema.moduleName }}.command';
import { Upsert{{ toPascalCase schema.moduleName }}Service } from './upsert-{{ toKebabCase schema.moduleName }}.service';

describe('Upsert{{ toPascalCase schema.moduleName }}CommandHandler', () =>
{
    let commandHandler: Upsert{{ toPascalCase schema.moduleName }}CommandHandler;
    let service: Upsert{{ toPascalCase schema.moduleName }}Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Upsert{{ toPascalCase schema.moduleName }}CommandHandler,
                {
                    provide : Upsert{{ toPascalCase schema.moduleName }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<Upsert{{ toPascalCase schema.moduleName }}CommandHandler>(Upsert{{ toPascalCase schema.moduleName }}CommandHandler);
        service         = module.get<Upsert{{ toPascalCase schema.moduleName }}Service>(Upsert{{ toPascalCase schema.moduleName }}Service);
    });

    describe('main', () =>
    {
        test('Upsert{{ toPascalCase schema.moduleName }}CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the Upsert{{ toPascalCase schema.moduleName }}Service', async () =>
        {
            expect(await commandHandler.execute(
                new Upsert{{ toPascalCase schema.moduleName }}Command(
                    {
                        {{#each schema.properties.upsertController}}
                        {{ toCamelCase name }}: {{ toCamelCase ../schema.moduleNames }}[0].{{ toCamelCase name }},
                        {{/each}}
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});