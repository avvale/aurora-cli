/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';
import { Upsert{{ toPascalCase schema.moduleNames }}CommandHandler } from './upsert-{{ toKebabCase schema.moduleNames }}.command-handler';
import { Upsert{{ toPascalCase schema.moduleNames }}Command } from './upsert-{{ toKebabCase schema.moduleNames }}.command';
import { Upsert{{ toPascalCase schema.moduleNames }}Service } from './upsert-{{ toKebabCase schema.moduleNames }}.service';

describe('Upsert{{ toPascalCase schema.moduleNames }}CommandHandler', () =>
{
    let commandHandler: Upsert{{ toPascalCase schema.moduleNames }}CommandHandler;
    let service: Upsert{{ toPascalCase schema.moduleNames }}Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Upsert{{ toPascalCase schema.moduleNames }}CommandHandler,
                {
                    provide : Upsert{{ toPascalCase schema.moduleNames }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<Upsert{{ toPascalCase schema.moduleNames }}CommandHandler>(Upsert{{ toPascalCase schema.moduleNames }}CommandHandler);
        service         = module.get<Upsert{{ toPascalCase schema.moduleNames }}Service>(Upsert{{ toPascalCase schema.moduleNames }}Service);
    });

    describe('main', () =>
    {
        test('Upsert{{ toPascalCase schema.moduleNames }}CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return {{ toCamelCase schema.moduleNames }} upserteds', async () =>
        {
            expect(await commandHandler.execute(
                new Upsert{{ toPascalCase schema.moduleNames }}Command(
                    {{ toCamelCase schema.moduleNames }},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});