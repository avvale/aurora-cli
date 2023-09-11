import { IamIPermissionRoleRepository, IamMockPermissionRoleRepository, IamPermissionRoleMapper, IamRawSQLPermissionsRolesQuery } from '@app/iam/permission-role';
import { IamRawSQLPermissionsRolesQueryHandler } from '@app/iam/permission-role/application/raw-sql/iam-raw-sql-permissions-roles.query-handler';
import { IamRawSQLPermissionsRolesService } from '@app/iam/permission-role/application/raw-sql/iam-raw-sql-permissions-roles.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLPermissionsRolesQueryHandler', () =>
{
    let queryHandler: IamRawSQLPermissionsRolesQueryHandler;
    let service: IamRawSQLPermissionsRolesService;
    let repository: IamMockPermissionRoleRepository;
    let mapper: IamPermissionRoleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamRawSQLPermissionsRolesQueryHandler,
                {
                    provide : IamIPermissionRoleRepository,
                    useClass: IamMockPermissionRoleRepository,
                },
                {
                    provide : IamRawSQLPermissionsRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamRawSQLPermissionsRolesQueryHandler>(IamRawSQLPermissionsRolesQueryHandler);
        service = module.get<IamRawSQLPermissionsRolesService>(IamRawSQLPermissionsRolesService);
        repository = <IamMockPermissionRoleRepository>module.get<IamIPermissionRoleRepository>(IamIPermissionRoleRepository);
        mapper = new IamPermissionRoleMapper();
    });

    describe('main', () =>
    {
        test('IamRawSQLPermissionsRolesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an permissionsRoles founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamRawSQLPermissionsRolesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
