import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { IamRawSQLPermissionsService } from './iam-raw-sql-permissions.service';
import { IamIPermissionRepository } from '../../domain/iam-permission.repository';
import { IamMockPermissionRepository } from '../../infrastructure/mock/iam-mock-permission.repository';

describe('IamRawSQLPermissionsService ', () =>
{
    let service: IamRawSQLPermissionsService ;
    let repository: IamIPermissionRepository;
    let mockRepository: IamMockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamRawSQLPermissionsService ,
                IamMockPermissionRepository,
                {
                    provide : IamIPermissionRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(IamRawSQLPermissionsService );
        repository      = module.get(IamIPermissionRepository);
        mockRepository  = module.get(IamMockPermissionRepository);
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
