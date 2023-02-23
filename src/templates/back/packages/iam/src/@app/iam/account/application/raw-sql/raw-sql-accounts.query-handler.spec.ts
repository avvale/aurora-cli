import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockAccountRepository } from '@app/iam/account/infrastructure/mock/mock-account.repository';
import { IAccountRepository } from '@app/iam/account/domain/account.repository';
import { AccountMapper } from '@app/iam/account/domain/account.mapper';
import { RawSQLAccountsQueryHandler } from './raw-sql-accounts.query-handler';
import { RawSQLAccountsQuery } from './raw-sql-accounts.query';
import { RawSQLAccountsService } from './raw-sql-accounts.service';

describe('RawSQLAccountsQueryHandler', () =>
{
    let queryHandler: RawSQLAccountsQueryHandler;
    let service: RawSQLAccountsService;
    let repository: MockAccountRepository;
    let mapper: AccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLAccountsQueryHandler,
                {
                    provide : IAccountRepository,
                    useClass: MockAccountRepository,
                },
                {
                    provide : RawSQLAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<RawSQLAccountsQueryHandler>(RawSQLAccountsQueryHandler);
        service         = module.get<RawSQLAccountsService>(RawSQLAccountsService);
        repository      = <MockAccountRepository>module.get<IAccountRepository>(IAccountRepository);
        mapper          = new AccountMapper();
    });

    describe('main', () =>
    {
        test('RawSQLAccountsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accounts founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLAccountsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});