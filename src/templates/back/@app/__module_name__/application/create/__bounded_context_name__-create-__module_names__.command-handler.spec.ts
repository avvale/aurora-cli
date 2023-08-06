/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/{{ toKebabCase schema.boundedContextName }}-mock-{{ toKebabCase schema.moduleName }}.data';
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}CommandHandler } from './{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.command-handler';
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Command } from './{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.command';
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Service } from './{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.service';

describe('{{ toCamelCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}CommandHandler', () =>
{
    let commandHandler: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}CommandHandler;
    let service: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}CommandHandler,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}CommandHandler>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}CommandHandler);
        service = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Service>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Service);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data createds', async () =>
        {
            expect(await commandHandler.execute(
                new {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Command(
                    {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
