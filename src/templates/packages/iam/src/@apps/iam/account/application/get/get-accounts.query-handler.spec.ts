import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetAccountsQueryHandler } from './get-accounts.query-handler';
import { MockAccountRepository } from '../../../../../@apps/iam/account/infrastructure/mock/mock-account.repository';
import { IAccountRepository } from '../../../../../@apps/iam/account/domain/account.repository';
import { AccountMapper } from '../../../../../@apps/iam/account/domain/account.mapper';
import { GetAccountsQuery } from './get-accounts.query';
import { GetAccountsService } from './get-accounts.service';

describe('GetAccountsQueryHandler', () =>
{
    let queryHandler: GetAccountsQueryHandler;
    let service: GetAccountsService;
    let repository: MockAccountRepository;
    let mapper: AccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAccountsQueryHandler,
                {
                    provide : IAccountRepository,
                    useClass: MockAccountRepository
                },
                {
                    provide : GetAccountsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetAccountsQueryHandler>(GetAccountsQueryHandler);
        service         = module.get<GetAccountsService>(GetAccountsService);
        repository      = <MockAccountRepository>module.get<IAccountRepository>(IAccountRepository);
        mapper          = new AccountMapper();
    });

    describe('main', () =>
    {
        test('GetAccountsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accounts founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetAccountsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});