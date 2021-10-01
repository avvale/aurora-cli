import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { Paginate{{ toPascalCase schema.moduleNames }}QueryHandler } from './paginate-{{ toKebabCase schema.moduleNames }}.query-handler';
import { Mock{{ toPascalCase schema.moduleName }}Repository } from '@hades/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';
import { I{{ toPascalCase schema.moduleName }}Repository } from '@hades/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/{{ toKebabCase schema.moduleName }}.repository';
import { {{ toPascalCase schema.moduleName }}Mapper } from '@hades/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/{{ toKebabCase schema.moduleName }}.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { Paginate{{ toPascalCase schema.moduleNames }}Query } from './paginate-{{ toKebabCase schema.moduleNames }}.query';
import { Paginate{{ toPascalCase schema.moduleNames }}Service } from './paginate-{{ toKebabCase schema.moduleNames }}.service';

describe('Paginate{{ toPascalCase schema.moduleNames }}QueryHandler', () =>
{
    let queryHandler: Paginate{{ toPascalCase schema.moduleNames }}QueryHandler;
    let service: Paginate{{ toPascalCase schema.moduleNames }}Service;
    let repository: Mock{{ toPascalCase schema.moduleName }}Repository;
    let mapper: {{ toPascalCase schema.moduleName }}Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Paginate{{ toPascalCase schema.moduleNames }}QueryHandler,
                {
                    provide: I{{ toPascalCase schema.moduleName }}Repository,
                    useClass: Mock{{ toPascalCase schema.moduleName }}Repository
                },
                {
                    provide: Paginate{{ toPascalCase schema.moduleNames }}Service,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<Paginate{{ toPascalCase schema.moduleNames }}QueryHandler>(Paginate{{ toPascalCase schema.moduleNames }}QueryHandler);
        service         = module.get<Paginate{{ toPascalCase schema.moduleNames }}Service>(Paginate{{ toPascalCase schema.moduleNames }}Service);
        repository      = <Mock{{ toPascalCase schema.moduleName }}Repository>module.get<I{{ toPascalCase schema.moduleName }}Repository>(I{{ toPascalCase schema.moduleName }}Repository);
        mapper          = new {{ toPascalCase schema.moduleName }}Mapper();
    });

    describe('main', () =>
    {
        test('Paginate{{ toPascalCase schema.moduleNames }}QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleNames }} paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new Paginate{{ toPascalCase schema.moduleNames }}Query(
                    {
                        offset: 0,
                        limit: 10
                    }
                )
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO())
                )
            );
        });
    });
});