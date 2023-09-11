import { IamIPermissionRepository, IamMockPermissionRepository } from '@app/iam/permission';
import { IamRawSQLPermissionsService } from '@app/iam/permission/application/raw-sql/iam-raw-sql-permissions.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

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
