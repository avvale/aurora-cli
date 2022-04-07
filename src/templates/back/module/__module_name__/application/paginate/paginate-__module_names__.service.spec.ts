import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { Paginate{{ toPascalCase schema.moduleNames }}Service } from './paginate-{{ toKebabCase schema.moduleNames }}.service';
import { I{{ toPascalCase schema.moduleName }}Repository } from './../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { Mock{{ toPascalCase schema.moduleName }}Repository } from './../../infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';

describe('Paginate{{ toPascalCase schema.moduleNames }}Service', () =>
{
    let service: Paginate{{ toPascalCase schema.moduleNames }}Service;
    let repository: I{{ toPascalCase schema.moduleName }}Repository;
    let mockRepository: Mock{{ toPascalCase schema.moduleName }}Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                Paginate{{ toPascalCase schema.moduleNames }}Service,
                Mock{{ toPascalCase schema.moduleName }}Repository,
                {
                    provide: I{{ toPascalCase schema.moduleName }}Repository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(Paginate{{ toPascalCase schema.moduleNames }}Service);
        repository      = module.get(I{{ toPascalCase schema.moduleName }}Repository);
        mockRepository  = module.get(Mock{{ toPascalCase schema.moduleName }}Repository);
    });

    describe('main', () =>
    {
        test('Paginate{{ toPascalCase schema.moduleNames }}Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate {{ toCamelCase schema.moduleNames }}', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            })));
            expect(await service.main({
                offset: 0,
                limit: 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            });
        });
    });
});