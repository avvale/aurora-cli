import { IamIRoleAccountRepository, IamMockRoleAccountRepository, IamRawSQLRolesAccountsQuery, IamRoleAccountMapper } from '@app/iam/role-account';
import { IamRawSQLRolesAccountsQueryHandler } from '@app/iam/role-account/application/raw-sql/iam-raw-sql-roles-accounts.query-handler';
import { IamRawSQLRolesAccountsService } from '@app/iam/role-account/application/raw-sql/iam-raw-sql-roles-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLRolesAccountsQueryHandler', () =>
{
    let queryHandler: IamRawSQLRolesAccountsQueryHandler;
    let service: IamRawSQLRolesAccountsService;
    let repository: IamMockRoleAccountRepository;
    let mapper: IamRoleAccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamRawSQLRolesAccountsQueryHandler,
                {
                    provide : IamIRoleAccountRepository,
                    useClass: IamMockRoleAccountRepository,
                },
                {
                    provide : IamRawSQLRolesAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamRawSQLRolesAccountsQueryHandler>(IamRawSQLRolesAccountsQueryHandler);
        service = module.get<IamRawSQLRolesAccountsService>(IamRawSQLRolesAccountsService);
        repository = <IamMockRoleAccountRepository>module.get<IamIRoleAccountRepository>(IamIRoleAccountRepository);
        mapper = new IamRoleAccountMapper();
    });

    describe('main', () =>
    {
        test('IamRawSQLRolesAccountsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an rolesAccounts founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamRawSQLRolesAccountsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
