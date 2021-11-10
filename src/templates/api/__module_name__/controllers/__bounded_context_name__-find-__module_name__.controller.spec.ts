import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Controller } from './{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}.controller';
import { ICommandBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/command-bus';
import { IQueryBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/query-bus';
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';

describe('{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Controller', () =>
{
    let controller: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Controller;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Controller
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

        controller  = module.get<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Controller>({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Controller);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a {{ toCamelCase schema.moduleName }}', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.moduleNames }}[0])));
            expect(await controller.main()).toBe({{ toCamelCase schema.moduleNames }}[0]);
        });
    });
});