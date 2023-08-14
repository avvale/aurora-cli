import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamMockAccountRepository } from '@app/iam/account/infrastructure/mock/iam-mock-account.repository';
import { IamIAccountRepository } from '@app/iam/account/domain/iam-account.repository';
import { IamAccountMapper } from '@app/iam/account/domain/iam-account.mapper';
import { IamRawSQLAccountsQueryHandler } from './iam-raw-sql-accounts.query-handler';
import { IamRawSQLAccountsQuery } from './iam-raw-sql-accounts.query';
import { IamRawSQLAccountsService } from './iam-raw-sql-accounts.service';

describe('RawSQLAccountsQueryHandler', () =>
{
    let queryHandler: IamRawSQLAccountsQueryHandler;
    let service: IamRawSQLAccountsService;
    let repository: IamMockAccountRepository;
    let mapper: IamAccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamRawSQLAccountsQueryHandler,
                {
                    provide : IamIAccountRepository,
                    useClass: IamMockAccountRepository,
                },
                {
                    provide : IamRawSQLAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamRawSQLAccountsQueryHandler>(IamRawSQLAccountsQueryHandler);
        service = module.get<IamRawSQLAccountsService>(IamRawSQLAccountsService);
        repository = <IamMockAccountRepository>module.get<IamIAccountRepository>(IamIAccountRepository);
        mapper = new IamAccountMapper();
    });

    describe('main', () =>
    {
        test('IamRawSQLAccountsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accounts founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamRawSQLAccountsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
