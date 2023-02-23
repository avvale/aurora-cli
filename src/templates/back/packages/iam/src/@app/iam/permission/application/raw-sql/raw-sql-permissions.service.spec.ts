import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { RawSQLPermissionsService } from './raw-sql-permissions.service';
import { IPermissionRepository } from '../../domain/permission.repository';
import { MockPermissionRepository } from '../../infrastructure/mock/mock-permission.repository';

describe('RawSQLPermissionsService', () =>
{
    let service: RawSQLPermissionsService;
    let repository: IPermissionRepository;
    let mockRepository: MockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                RawSQLPermissionsService,
                MockPermissionRepository,
                {
                    provide : IPermissionRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(RawSQLPermissionsService);
        repository      = module.get(IPermissionRepository);
        mockRepository  = module.get(MockPermissionRepository);
    });

    describe('main', () =>
    {
        test('RawSQLPermissionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get permissions', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});