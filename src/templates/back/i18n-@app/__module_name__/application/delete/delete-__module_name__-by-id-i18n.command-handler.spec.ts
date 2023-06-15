import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommandHandler } from './delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.command-handler';
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.data';
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommand } from './delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.command';
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18nService } from './delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.service';

describe('Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommandHandler', () =>
{
    let commandHandler: Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommandHandler;
    let service: Delete{{ toPascalCase schema.moduleName }}ByIdI18nService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommandHandler,
                {
                    provide : Delete{{ toPascalCase schema.moduleName }}ByIdI18nService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommandHandler>(Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommandHandler);
        service         = module.get<Delete{{ toPascalCase schema.moduleName }}ByIdI18nService>(Delete{{ toPascalCase schema.moduleName }}ByIdI18nService);
    });

    describe('main', () =>
    {
        test('Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the Delete{{ toPascalCase schema.moduleName }}ByIdI18nService', async () =>
        {
            expect(await commandHandler.execute(
                new Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommand(
                    {{ toCamelCase schema.moduleNames }}[0].id,
                ),
            )).toBe(undefined);
        });
    });
});