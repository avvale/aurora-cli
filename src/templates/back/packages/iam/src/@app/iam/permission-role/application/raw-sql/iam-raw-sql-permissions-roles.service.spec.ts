import { IamIPermissionRoleRepository, IamMockPermissionRoleRepository } from '@app/iam/permission-role';
import { IamRawSQLPermissionsRolesService } from '@app/iam/permission-role/application/raw-sql/iam-raw-sql-permissions-roles.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamRawSQLPermissionsRolesService ', () =>
{
    let service: IamRawSQLPermissionsRolesService ;
    let repository: IamIPermissionRoleRepository;
    let mockRepository: IamMockPermissionRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamRawSQLPermissionsRolesService ,
                IamMockPermissionRoleRepository,
                {
                    provide : IamIPermissionRoleRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(IamRawSQLPermissionsRolesService );
        repository      = module.get(IamIPermissionRoleRepository);
        mockRepository  = module.get(IamMockPermissionRoleRepository);
    });

    describe('main', () =>
    {
        test('RawSQLPermissionsRolesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get permissionsRoles', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
