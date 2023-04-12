import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { Find{{ toPascalCase schema.moduleName }}QueryHandler } from './find-{{ toKebabCase schema.moduleName }}.query-handler';
import { Mock{{ toPascalCase schema.moduleName }}Repository } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';
import { I{{ toPascalCase schema.moduleName }}Repository } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/{{ toKebabCase schema.moduleName }}.repository';
import { {{ toPascalCase schema.moduleName }}Mapper } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/{{ toKebabCase schema.moduleName }}.mapper';
import { Find{{ toPascalCase schema.moduleName }}Query } from './find-{{ toKebabCase schema.moduleName }}.query';
import { Find{{ toPascalCase schema.moduleName }}Service } from './find-{{ toKebabCase schema.moduleName }}.service';

describe('Find{{ toPascalCase schema.moduleName }}QueryHandler', () =>
{
    let queryHandler: Find{{ toPascalCase schema.moduleName }}QueryHandler;
    let service: Find{{ toPascalCase schema.moduleName }}Service;
    let repository: Mock{{ toPascalCase schema.moduleName }}Repository;
    let mapper: {{ toPascalCase schema.moduleName }}Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Find{{ toPascalCase schema.moduleName }}QueryHandler,
                {
                    provide : I{{ toPascalCase schema.moduleName }}Repository,
                    useClass: Mock{{ toPascalCase schema.moduleName }}Repository,
                },
                {
                    provide : Find{{ toPascalCase schema.moduleName }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<Find{{ toPascalCase schema.moduleName }}QueryHandler>(Find{{ toPascalCase schema.moduleName }}QueryHandler);
        service = module.get<Find{{ toPascalCase schema.moduleName }}Service>(Find{{ toPascalCase schema.moduleName }}Service);
        repository = <Mock{{ toPascalCase schema.moduleName }}Repository>module.get<I{{ toPascalCase schema.moduleName }}Repository>(I{{ toPascalCase schema.moduleName }}Repository);
        mapper = new {{ toPascalCase schema.moduleName }}Mapper();
    });

    describe('main', () =>
    {
        test('Find{{ toPascalCase schema.moduleName }}QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleName }} founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new Find{{ toPascalCase schema.moduleName }}Query(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});