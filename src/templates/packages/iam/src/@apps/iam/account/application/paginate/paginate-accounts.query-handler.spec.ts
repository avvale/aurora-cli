import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from 'aurora-ts-core';

// custom items
import { PaginateAccountsQueryHandler } from './paginate-accounts.query-handler';
import { MockAccountRepository } from '../../../../../@apps/iam/account/infrastructure/mock/mock-account.repository';
import { IAccountRepository } from '../../../../../@apps/iam/account/domain/account.repository';
import { AccountMapper } from '../../../../../@apps/iam/account/domain/account.mapper';
import { PaginateAccountsQuery } from './paginate-accounts.query';
import { PaginateAccountsService } from './paginate-accounts.service';

describe('PaginateAccountsQueryHandler', () =>
{
    let queryHandler: PaginateAccountsQueryHandler;
    let service: PaginateAccountsService;
    let repository: MockAccountRepository;
    let mapper: AccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateAccountsQueryHandler,
                {
                    provide : IAccountRepository,
                    useClass: MockAccountRepository
                },
                {
                    provide : PaginateAccountsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateAccountsQueryHandler>(PaginateAccountsQueryHandler);
        service         = module.get<PaginateAccountsService>(PaginateAccountsService);
        repository      = <MockAccountRepository>module.get<IAccountRepository>(IAccountRepository);
        mapper          = new AccountMapper();
    });

    describe('main', () =>
    {
        test('PaginateAccountsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accounts paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateAccountsQuery(
                    {
                        offset: 0,
                        limit: 10
                    }
                )
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO())
                )
            );
        });
    });
});