import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler } from './{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.query-handler';
import { {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/{{ toKebabCase schema.boundedContextName }}-mock-{{ toKebabCase schema.moduleName }}.repository';
import { {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/{{ toKebabCase schema.boundedContextName }}-mock-{{ toKebabCase schema.moduleName }}.data';
import { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.repository';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.mapper';
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQuery } from './{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.query';
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdService } from './{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.service';

describe('{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler', () =>
{
    let queryHandler: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler;
    let service: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdService;
    let repository: {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository;
    let mapper: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
                    useClass: {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository,
                },
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler>({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler);
        service = module.get<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdService>({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdService);
        repository = <{{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository>module.get<{{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository>({{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository);
        mapper = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper();
    });

    describe('main', () =>
    {
        test('Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleName }} founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQuery(
                    {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
