import { IamGetRolesAccountsQuery, IamIRoleAccountRepository, IamMockRoleAccountRepository, IamRoleAccountMapper } from '@app/iam/role-account';
import { IamGetRolesAccountsQueryHandler } from '@app/iam/role-account/application/get/iam-get-roles-accounts.query-handler';
import { IamGetRolesAccountsService } from '@app/iam/role-account/application/get/iam-get-roles-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetRolesAccountsQueryHandler', () =>
{
    let queryHandler: IamGetRolesAccountsQueryHandler;
    let service: IamGetRolesAccountsService;
    let repository: IamMockRoleAccountRepository;
    let mapper: IamRoleAccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamGetRolesAccountsQueryHandler,
                {
                    provide : IamIRoleAccountRepository,
                    useClass: IamMockRoleAccountRepository,
                },
                {
                    provide : IamGetRolesAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamGetRolesAccountsQueryHandler>(IamGetRolesAccountsQueryHandler);
        service = module.get<IamGetRolesAccountsService>(IamGetRolesAccountsService);
        repository = <IamMockRoleAccountRepository>module.get<IamIRoleAccountRepository>(IamIRoleAccountRepository);
        mapper = new IamRoleAccountMapper();
    });

    describe('main', () =>
    {
        test('IamGetRolesAccountsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an rolesAccounts founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamGetRolesAccountsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
