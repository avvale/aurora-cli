import { IamIRoleAccountRepository, IamMockRoleAccountRepository, IamPaginateRolesAccountsQuery } from '@app/iam/role-account';
import { IamPaginateRolesAccountsQueryHandler } from '@app/iam/role-account/application/paginate/iam-paginate-roles-accounts.query-handler';
import { IamPaginateRolesAccountsService } from '@app/iam/role-account/application/paginate/iam-paginate-roles-accounts.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateRolesAccountsQueryHandler', () =>
{
    let queryHandler: IamPaginateRolesAccountsQueryHandler;
    let service: IamPaginateRolesAccountsService;
    let repository: IamMockRoleAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamPaginateRolesAccountsQueryHandler,
                {
                    provide : IamIRoleAccountRepository,
                    useClass: IamMockRoleAccountRepository,
                },
                {
                    provide : IamPaginateRolesAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamPaginateRolesAccountsQueryHandler>(IamPaginateRolesAccountsQueryHandler);
        service = module.get<IamPaginateRolesAccountsService>(IamPaginateRolesAccountsService);
        repository = <IamMockRoleAccountRepository>module.get<IamIRoleAccountRepository>(IamIRoleAccountRepository);
    });

    describe('main', () =>
    {
        test('IamPaginateRolesAccountsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an rolesAccounts paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new IamPaginateRolesAccountsQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
