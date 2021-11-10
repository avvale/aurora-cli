import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Resolver } from './{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleName }}.resolver';
import { ICommandBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/command-bus';
import { IQueryBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/query-bus';
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Input } from './../../../../graphql';

describe('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Resolver', () =>
{
    let resolver: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Resolver,
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

        resolver    = module.get<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Resolver>({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a {{ toCamelCase schema.moduleName }} created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.moduleNames }}[0])));
            expect(await resolver.main(<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Input>{{ toCamelCase schema.moduleNames }}[0])).toBe({{ toCamelCase schema.moduleNames }}[0]);
        });
    });
});