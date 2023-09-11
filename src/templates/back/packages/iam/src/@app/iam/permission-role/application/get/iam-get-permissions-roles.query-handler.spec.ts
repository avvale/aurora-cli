import { IamGetPermissionsRolesQuery, IamIPermissionRoleRepository, IamMockPermissionRoleRepository, IamPermissionRoleMapper } from '@app/iam/permission-role';
import { IamGetPermissionsRolesQueryHandler } from '@app/iam/permission-role/application/get/iam-get-permissions-roles.query-handler';
import { IamGetPermissionsRolesService } from '@app/iam/permission-role/application/get/iam-get-permissions-roles.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetPermissionsRolesQueryHandler', () =>
{
    let queryHandler: IamGetPermissionsRolesQueryHandler;
    let service: IamGetPermissionsRolesService;
    let repository: IamMockPermissionRoleRepository;
    let mapper: IamPermissionRoleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamGetPermissionsRolesQueryHandler,
                {
                    provide : IamIPermissionRoleRepository,
                    useClass: IamMockPermissionRoleRepository,
                },
                {
                    provide : IamGetPermissionsRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamGetPermissionsRolesQueryHandler>(IamGetPermissionsRolesQueryHandler);
        service = module.get<IamGetPermissionsRolesService>(IamGetPermissionsRolesService);
        repository = <IamMockPermissionRoleRepository>module.get<IamIPermissionRoleRepository>(IamIPermissionRoleRepository);
        mapper = new IamPermissionRoleMapper();
    });

    describe('main', () =>
    {
        test('IamGetPermissionsRolesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an permissionsRoles founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamGetPermissionsRolesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
