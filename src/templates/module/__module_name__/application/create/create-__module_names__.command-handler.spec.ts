/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toCamelCase schema.moduleNames }} } from '../../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';
import { Create{{ toPascalCase schema.moduleNames }}CommandHandler } from './create-{{ toKebabCase schema.moduleNames }}.command-handler';
import { Create{{ toPascalCase schema.moduleNames }}Command } from './create-{{ toKebabCase schema.moduleNames }}.command';
import { Create{{ toPascalCase schema.moduleNames }}Service } from './create-{{ toKebabCase schema.moduleNames }}.service';

describe('Create{{ toPascalCase schema.moduleNames }}CommandHandler', () =>
{
    let commandHandler: Create{{ toPascalCase schema.moduleNames }}CommandHandler;
    let service: Create{{ toPascalCase schema.moduleNames }}Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Create{{ toPascalCase schema.moduleNames }}CommandHandler,
                {
                    provide : Create{{ toPascalCase schema.moduleNames }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<Create{{ toPascalCase schema.moduleNames }}CommandHandler>(Create{{ toPascalCase schema.moduleNames }}CommandHandler);
        service         = module.get<Create{{ toPascalCase schema.moduleNames }}Service>(Create{{ toPascalCase schema.moduleNames }}Service);
    });

    describe('main', () =>
    {
        test('Create{{ toPascalCase schema.moduleNames }}CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return {{ toCamelCase schema.moduleNames }} createds', async () =>
        {
            expect(await commandHandler.execute(
                new Create{{ toPascalCase schema.moduleNames }}Command(
                    {{ toCamelCase schema.moduleNames }},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});