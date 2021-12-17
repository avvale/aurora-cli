import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { {{ toCamelCase schema.moduleNames }} } from '../../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';
import { Find{{ toPascalCase schema.moduleName }}ByIdService } from './find-{{ toKebabCase schema.moduleName }}-by-id.service';
import { {{ toPascalCase schema.moduleName }}Id } from './../../domain/value-objects';
import { I{{ toPascalCase schema.moduleName }}Repository } from './../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { Mock{{ toPascalCase schema.moduleName }}Repository } from './../../infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';

describe('Find{{ toPascalCase schema.moduleName }}ByIdService', () =>
{
    let service: Find{{ toPascalCase schema.moduleName }}ByIdService;
    let repository: I{{ toPascalCase schema.moduleName }}Repository;
    let mockRepository: Mock{{ toPascalCase schema.moduleName }}Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                Find{{ toPascalCase schema.moduleName }}ByIdService,
                Mock{{ toPascalCase schema.moduleName }}Repository,
                {
                    provide: I{{ toPascalCase schema.moduleName }}Repository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(Find{{ toPascalCase schema.moduleName }}ByIdService);
        repository      = module.get(I{{ toPascalCase schema.moduleName }}Repository);
        mockRepository  = module.get(Mock{{ toPascalCase schema.moduleName }}Repository);
    });

    describe('main', () =>
    {
        test('Find{{ toPascalCase schema.moduleName }}ByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find {{ toCamelCase schema.moduleName }} by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new {{ toPascalCase schema.moduleName }}Id({{ toCamelCase schema.moduleNames }}[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});