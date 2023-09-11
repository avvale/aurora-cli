import { IamIRoleRepository, IamMockRoleRepository, IamRawSQLRolesQuery, IamRoleMapper } from '@app/iam/role';
import { IamRawSQLRolesQueryHandler } from '@app/iam/role/application/raw-sql/iam-raw-sql-roles.query-handler';
import { IamRawSQLRolesService } from '@app/iam/role/application/raw-sql/iam-raw-sql-roles.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLRolesQueryHandler', () =>
{
    let queryHandler: IamRawSQLRolesQueryHandler;
    let service: IamRawSQLRolesService;
    let repository: IamMockRoleRepository;
    let mapper: IamRoleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamRawSQLRolesQueryHandler,
                {
                    provide : IamIRoleRepository,
                    useClass: IamMockRoleRepository,
                },
                {
                    provide : IamRawSQLRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamRawSQLRolesQueryHandler>(IamRawSQLRolesQueryHandler);
        service = module.get<IamRawSQLRolesService>(IamRawSQLRolesService);
        repository = <IamMockRoleRepository>module.get<IamIRoleRepository>(IamIRoleRepository);
        mapper = new IamRoleMapper();
    });

    describe('main', () =>
    {
        test('IamRawSQLRolesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an roles founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamRawSQLRolesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
