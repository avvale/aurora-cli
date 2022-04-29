import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAccountQueryHandler } from './find-account.query-handler';
import { MockAccountRepository } from '../../../../../@apps/iam/account/infrastructure/mock/mock-account.repository';
import { IAccountRepository } from '../../../../../@apps/iam/account/domain/account.repository';
import { AccountMapper } from '../../../../../@apps/iam/account/domain/account.mapper';
import { FindAccountQuery } from './find-account.query';
import { FindAccountService } from './find-account.service';

describe('FindAccountQueryHandler', () =>
{
    let queryHandler: FindAccountQueryHandler;
    let service: FindAccountService;
    let repository: MockAccountRepository;
    let mapper: AccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAccountQueryHandler,
                {
                    provide : IAccountRepository,
                    useClass: MockAccountRepository
                },
                {
                    provide : FindAccountService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindAccountQueryHandler>(FindAccountQueryHandler);
        service         = module.get<FindAccountService>(FindAccountService);
        repository      = <MockAccountRepository>module.get<IAccountRepository>(IAccountRepository);
        mapper          = new AccountMapper();
    });

    describe('main', () =>
    {
        test('FindAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an account founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAccountQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});