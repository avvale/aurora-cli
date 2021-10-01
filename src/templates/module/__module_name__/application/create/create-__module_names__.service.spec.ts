import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { Create{{ toPascalCase schema.moduleNames }}Service } from './create-{{ toKebabCase schema.moduleNames }}.service';
import { I{{ toPascalCase schema.moduleName }}Repository } from './../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { Mock{{ toPascalCase schema.moduleName }}Repository } from './../../infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';

describe('Create{{ toPascalCase schema.moduleNames }}Service', () =>
{
    let service: Create{{ toPascalCase schema.moduleNames }}Service;
    let repository: I{{ toPascalCase schema.moduleName }}Repository;
    let mockRepository: Mock{{ toPascalCase schema.moduleName }}Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                Create{{ toPascalCase schema.moduleNames }}Service,
                Mock{{ toPascalCase schema.moduleName }}Repository,
                {
                    provide: I{{ toPascalCase schema.moduleName }}Repository,
                    useValue: {
                        insert: (items) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(Create{{ toPascalCase schema.moduleNames }}Service);
        repository      = module.get(I{{ toPascalCase schema.moduleName }}Repository);
        mockRepository  = module.get(Mock{{ toPascalCase schema.moduleName }}Repository);
    });

    describe('main', () =>
    {
        test('Create{{ toPascalCase schema.moduleNames }}Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create {{ toCamelCase schema.moduleNames }} and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});