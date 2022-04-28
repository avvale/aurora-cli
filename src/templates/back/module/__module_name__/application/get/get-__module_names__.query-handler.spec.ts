import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { Get{{ toPascalCase schema.moduleNames }}QueryHandler } from './get-{{ toKebabCase schema.moduleNames }}.query-handler';
import { Mock{{ toPascalCase schema.moduleName }}Repository } from '../../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';
import { I{{ toPascalCase schema.moduleName }}Repository } from '../../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/{{ toKebabCase schema.moduleName }}.repository';
import { {{ toPascalCase schema.moduleName }}Mapper } from '../../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/{{ toKebabCase schema.moduleName }}.mapper';
import { Get{{ toPascalCase schema.moduleNames }}Query } from './get-{{ toKebabCase schema.moduleNames }}.query';
import { Get{{ toPascalCase schema.moduleNames }}Service } from './get-{{ toKebabCase schema.moduleNames }}.service';

describe('Get{{ toPascalCase schema.moduleNames }}QueryHandler', () =>
{
    let queryHandler: Get{{ toPascalCase schema.moduleNames }}QueryHandler;
    let service: Get{{ toPascalCase schema.moduleNames }}Service;
    let repository: Mock{{ toPascalCase schema.moduleName }}Repository;
    let mapper: {{ toPascalCase schema.moduleName }}Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Get{{ toPascalCase schema.moduleNames }}QueryHandler,
                {
                    provide : I{{ toPascalCase schema.moduleName }}Repository,
                    useClass: Mock{{ toPascalCase schema.moduleName }}Repository,
                },
                {
                    provide : Get{{ toPascalCase schema.moduleNames }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<Get{{ toPascalCase schema.moduleNames }}QueryHandler>(Get{{ toPascalCase schema.moduleNames }}QueryHandler);
        service         = module.get<Get{{ toPascalCase schema.moduleNames }}Service>(Get{{ toPascalCase schema.moduleNames }}Service);
        repository      = <Mock{{ toPascalCase schema.moduleName }}Repository>module.get<I{{ toPascalCase schema.moduleName }}Repository>(I{{ toPascalCase schema.moduleName }}Repository);
        mapper          = new {{ toPascalCase schema.moduleName }}Mapper();
    });

    describe('main', () =>
    {
        test('Get{{ toPascalCase schema.moduleNames }}QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleNames }} founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new Get{{ toPascalCase schema.moduleNames }}Query(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});