import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { Delete{{ toPascalCase schema.moduleNames }}Service } from './delete-{{ toKebabCase schema.moduleNames }}.service';
import { I{{ toPascalCase schema.moduleName }}Repository } from './../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { Mock{{ toPascalCase schema.moduleName }}Repository } from './../../infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';

describe('Delete{{ toPascalCase schema.moduleNames }}Service', () =>
{
    let service: Delete{{ toPascalCase schema.moduleNames }}Service;
    let repository: I{{ toPascalCase schema.moduleName }}Repository;
    let mockRepository: Mock{{ toPascalCase schema.moduleName }}Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                Delete{{ toPascalCase schema.moduleNames }}Service,
                Mock{{ toPascalCase schema.moduleName }}Repository,
                {
                    provide: I{{ toPascalCase schema.moduleName }}Repository,
                    useValue: {
                        get: (queryStatement) => {},
                        delete: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(Delete{{ toPascalCase schema.moduleNames }}Service);
        repository      = module.get(I{{ toPascalCase schema.moduleName }}Repository);
        mockRepository  = module.get(Mock{{ toPascalCase schema.moduleName }}Repository);
    });

    describe('main', () =>
    {
        test('Delete{{ toPascalCase schema.moduleNames }}Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete {{ toCamelCase schema.moduleName }} and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});