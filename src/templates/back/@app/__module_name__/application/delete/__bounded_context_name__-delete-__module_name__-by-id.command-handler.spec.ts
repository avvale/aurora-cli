import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler } from './{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.command-handler';
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.data';
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommand } from './{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.command';
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService } from './{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.service';

describe('{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler', () =>
{
    let commandHandler: Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler;
    let service: Delete{{ toPascalCase schema.moduleName }}ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler,
                {
                    provide : Delete{{ toPascalCase schema.moduleName }}ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler>(Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler);
        service = module.get<Delete{{ toPascalCase schema.moduleName }}ByIdService>(Delete{{ toPascalCase schema.moduleName }}ByIdService);
    });

    describe('main', () =>
    {
        test('Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the Delete{{ toPascalCase schema.moduleName }}ByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new Delete{{ toPascalCase schema.moduleName }}ByIdCommand(
                    {{ toCamelCase schema.moduleNames }}[0].id,
                ),
            )).toBe(undefined);
        });
    });
});