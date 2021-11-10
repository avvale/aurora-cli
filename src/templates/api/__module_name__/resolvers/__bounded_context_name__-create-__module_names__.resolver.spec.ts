import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver } from './{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.resolver';
import { ICommandBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/command-bus';
import { IQueryBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/query-bus';
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input } from './../../../../graphql';

describe('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver', () =>
{
    let resolver: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    }
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    }
                },
            ]
        }).compile();

        resolver    = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleNames }} created', async () =>
        {
            expect(await resolver.main(<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input[]>{{ toCamelCase schema.moduleNames }})).toBe(true);
        });
    });
});