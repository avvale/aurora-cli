import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver } from './{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.resolver';
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.handler';
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input } from '@api/graphql';

// sources
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.data';

describe('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver', () =>
{
    let resolver: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver;
    let handler: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver);
        handler = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler);
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
            expect(await resolver.main(<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input[]>{{ toCamelCase schema.moduleNames }})).toBe(undefined);
        });
    });
});