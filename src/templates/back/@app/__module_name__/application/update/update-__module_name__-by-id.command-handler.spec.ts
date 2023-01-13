import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';
import { Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler } from './update-{{ toKebabCase schema.moduleName }}-by-id.command-handler';
import { Update{{ toPascalCase schema.moduleName }}ByIdCommand } from './update-{{ toKebabCase schema.moduleName }}-by-id.command';
import { Update{{ toPascalCase schema.moduleName }}ByIdService } from './update-{{ toKebabCase schema.moduleName }}-by-id.service';

describe('Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler', () =>
{
    let commandHandler: Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler;
    let service: Update{{ toPascalCase schema.moduleName }}ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler,
                {
                    provide : Update{{ toPascalCase schema.moduleName }}ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler>(Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler);
        service         = module.get<Update{{ toPascalCase schema.moduleName }}ByIdService>(Update{{ toPascalCase schema.moduleName }}ByIdService);
    });

    describe('main', () =>
    {
        test('Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleName }} created', async () =>
        {
            expect(await commandHandler.execute(
                new Update{{ toPascalCase schema.moduleName }}ByIdCommand(
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