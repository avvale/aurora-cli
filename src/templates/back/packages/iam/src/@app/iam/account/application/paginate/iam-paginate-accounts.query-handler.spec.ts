import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { IamPaginateAccountsQueryHandler } from './iam-paginate-accounts.query-handler';
import { IamMockAccountRepository } from '@app/iam/account/infrastructure/mock/iam-mock-account.repository';
import { IamIAccountRepository } from '@app/iam/account/domain/iam-account.repository';
import { IamAccountMapper } from '@app/iam/account/domain/iam-account.mapper';
import { IamPaginateAccountsQuery } from './iam-paginate-accounts.query';
import { IamPaginateAccountsService } from './iam-paginate-accounts.service';

describe('IamPaginateAccountsQueryHandler', () =>
{
    let queryHandler: IamPaginateAccountsQueryHandler;
    let service: IamPaginateAccountsService;
    let repository: IamMockAccountRepository;
    let mapper: IamAccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamPaginateAccountsQueryHandler,
                {
                    provide : IamIAccountRepository,
                    useClass: IamMockAccountRepository,
                },
                {
                    provide : IamPaginateAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamPaginateAccountsQueryHandler>(IamPaginateAccountsQueryHandler);
        service = module.get<IamPaginateAccountsService>(IamPaginateAccountsService);
        repository = <IamMockAccountRepository>module.get<IamIAccountRepository>(IamIAccountRepository);
        mapper = new IamAccountMapper();
    });

    describe('main', () =>
    {
        test('IamPaginateAccountsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accounts paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new IamPaginateAccountsQuery(
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
