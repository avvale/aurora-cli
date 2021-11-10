import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller } from './{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.controller';
import { ICommandBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/command-bus';
import { IQueryBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/query-bus';
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';

describe('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller', () =>
{
    let controller: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller
            ],
            providers: [
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {},
                    }
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {},
                    }
                },
            ]
        }).compile();

        controller  = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleNames }} created', async () =>
        {
            expect(await controller.main({{ toCamelCase schema.moduleNames }})).toBe(undefined);
        });
    });
});