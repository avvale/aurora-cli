import { IamIPermissionRepository, IamMockPermissionRepository, IamPermissionMapper, IamRawSQLPermissionsQuery } from '@app/iam/permission';
import { IamRawSQLPermissionsQueryHandler } from '@app/iam/permission/application/raw-sql/iam-raw-sql-permissions.query-handler';
import { IamRawSQLPermissionsService } from '@app/iam/permission/application/raw-sql/iam-raw-sql-permissions.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLPermissionsQueryHandler', () =>
{
    let queryHandler: IamRawSQLPermissionsQueryHandler;
    let service: IamRawSQLPermissionsService;
    let repository: IamMockPermissionRepository;
    let mapper: IamPermissionMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamRawSQLPermissionsQueryHandler,
                {
                    provide : IamIPermissionRepository,
                    useClass: IamMockPermissionRepository,
                },
                {
                    provide : IamRawSQLPermissionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamRawSQLPermissionsQueryHandler>(IamRawSQLPermissionsQueryHandler);
        service = module.get<IamRawSQLPermissionsService>(IamRawSQLPermissionsService);
        repository = <IamMockPermissionRepository>module.get<IamIPermissionRepository>(IamIPermissionRepository);
        mapper = new IamPermissionMapper();
    });

    describe('main', () =>
    {
        test('IamRawSQLPermissionsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an permissions founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamRawSQLPermissionsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
