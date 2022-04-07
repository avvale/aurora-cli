import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommandHandler } from './delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.command-handler';
import { {{ toCamelCase schema.moduleNames }} } from '../../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommand } from './delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.command';
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18NService } from './delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.service';

describe('Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommandHandler', () =>
{
    let commandHandler: Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommandHandler;
    let service: Delete{{ toPascalCase schema.moduleName }}ByIdI18NService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommandHandler,
                {
                    provide: Delete{{ toPascalCase schema.moduleName }}ByIdI18NService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommandHandler>(Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommandHandler);
        service         = module.get<Delete{{ toPascalCase schema.moduleName }}ByIdI18NService>(Delete{{ toPascalCase schema.moduleName }}ByIdI18NService);
    });

    describe('main', () =>
    {
        test('Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the Delete{{ toPascalCase schema.moduleName }}ByIdI18NService', async () =>
        {
            expect(await commandHandler.execute(
                new Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommand(
                    {{ toCamelCase schema.moduleNames }}[0].id,
                )
            )).toBe(undefined);
        });
    });
});