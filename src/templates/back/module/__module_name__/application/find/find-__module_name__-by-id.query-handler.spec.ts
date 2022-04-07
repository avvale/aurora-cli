import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler } from './find-{{ toKebabCase schema.moduleName }}-by-id.query-handler';
import { Mock{{ toPascalCase schema.moduleName }}Repository } from '../../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';
import { {{ toCamelCase schema.moduleNames }} } from '../../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';
import { I{{ toPascalCase schema.moduleName }}Repository } from '../../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/{{ toKebabCase schema.moduleName }}.repository';
import { {{ toPascalCase schema.moduleName }}Mapper } from '../../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/{{ toKebabCase schema.moduleName }}.mapper';
import { Find{{ toPascalCase schema.moduleName }}ByIdQuery } from './find-{{ toKebabCase schema.moduleName }}-by-id.query';
import { Find{{ toPascalCase schema.moduleName }}ByIdService } from './find-{{ toKebabCase schema.moduleName }}-by-id.service';

describe('Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler', () =>
{
    let queryHandler: Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler;
    let service: Find{{ toPascalCase schema.moduleName }}ByIdService;
    let repository: Mock{{ toPascalCase schema.moduleName }}Repository;
    let mapper: {{ toPascalCase schema.moduleName }}Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler,
                {
                    provide : I{{ toPascalCase schema.moduleName }}Repository,
                    useClass: Mock{{ toPascalCase schema.moduleName }}Repository
                },
                {
                    provide : Find{{ toPascalCase schema.moduleName }}ByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler>(Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler);
        service         = module.get<Find{{ toPascalCase schema.moduleName }}ByIdService>(Find{{ toPascalCase schema.moduleName }}ByIdService);
        repository      = <Mock{{ toPascalCase schema.moduleName }}Repository>module.get<I{{ toPascalCase schema.moduleName }}Repository>(I{{ toPascalCase schema.moduleName }}Repository);
        mapper          = new {{ toPascalCase schema.moduleName }}Mapper();
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
                new Find{{ toPascalCase schema.moduleName }}ByIdQuery(
                    {{ toCamelCase schema.moduleNames }}[0].id,

                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});