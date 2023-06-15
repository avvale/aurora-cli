import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { Mock{{ toPascalCase schema.moduleName }}Repository } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';
import { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.repository';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.mapper';
import { RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler } from './raw-sql-{{ toKebabCase schema.moduleNames }}.query-handler';
import { RawSQL{{ toPascalCase schema.moduleNames }}Query } from './raw-sql-{{ toKebabCase schema.moduleNames }}.query';
import { RawSQL{{ toPascalCase schema.moduleNames }}Service } from './raw-sql-{{ toKebabCase schema.moduleNames }}.service';

describe('RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler', () =>
{
    let queryHandler: RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler;
    let service: RawSQL{{ toPascalCase schema.moduleNames }}Service;
    let repository: Mock{{ toPascalCase schema.moduleName }}Repository;
    let mapper: {{ toPascalCase schema.moduleName }}Mapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
                    useClass: Mock{{ toPascalCase schema.moduleName }}Repository,
                },
                {
                    provide : RawSQL{{ toPascalCase schema.moduleNames }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler>(RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler);
        service = module.get<RawSQL{{ toPascalCase schema.moduleNames }}Service>(RawSQL{{ toPascalCase schema.moduleNames }}Service);
        repository = <Mock{{ toPascalCase schema.moduleName }}Repository>module.get<{{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository>({{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository);
        mapper = new {{ toPascalCase schema.moduleName }}Mapper();
    });

    describe('main', () =>
    {
        test('RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleNames }} founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQL{{ toPascalCase schema.moduleNames }}Query(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});