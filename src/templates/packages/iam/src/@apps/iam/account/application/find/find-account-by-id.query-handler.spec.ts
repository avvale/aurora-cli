import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAccountByIdQueryHandler } from './find-account-by-id.query-handler';
import { MockAccountRepository } from '../../../../../@apps/iam/account/infrastructure/mock/mock-account.repository';
import { accounts } from '../../../../../@apps/iam/account/infrastructure/seeds/account.seed';
import { IAccountRepository } from '../../../../../@apps/iam/account/domain/account.repository';
import { AccountMapper } from '../../../../../@apps/iam/account/domain/account.mapper';
import { FindAccountByIdQuery } from './find-account-by-id.query';
import { FindAccountByIdService } from './find-account-by-id.service';

describe('FindAccountByIdQueryHandler', () =>
{
    let queryHandler: FindAccountByIdQueryHandler;
    let service: FindAccountByIdService;
    let repository: MockAccountRepository;
    let mapper: AccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAccountByIdQueryHandler,
                {
                    provide : IAccountRepository,
                    useClass: MockAccountRepository
                },
                {
                    provide : FindAccountByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindAccountByIdQueryHandler>(FindAccountByIdQueryHandler);
        service         = module.get<FindAccountByIdService>(FindAccountByIdService);
        repository      = <MockAccountRepository>module.get<IAccountRepository>(IAccountRepository);
        mapper          = new AccountMapper();
    });

    describe('main', () =>
    {
        test('FindAccountByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an account founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAccountByIdQuery(
                    accounts[0].id,

                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});