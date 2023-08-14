import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetAccountsQueryHandler } from './iam-get-accounts.query-handler';
import { IamMockAccountRepository } from '@app/iam/account/infrastructure/mock/iam-mock-account.repository';
import { IamIAccountRepository } from '@app/iam/account/domain/iam-account.repository';
import { IamAccountMapper } from '@app/iam/account/domain/iam-account.mapper';
import { IamGetAccountsQuery } from './iam-get-accounts.query';
import { IamGetAccountsService } from './iam-get-accounts.service';

describe('GetAccountsQueryHandler', () =>
{
    let queryHandler: IamGetAccountsQueryHandler;
    let service: IamGetAccountsService;
    let repository: IamMockAccountRepository;
    let mapper: IamAccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamGetAccountsQueryHandler,
                {
                    provide : IamIAccountRepository,
                    useClass: IamMockAccountRepository,
                },
                {
                    provide : IamGetAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamGetAccountsQueryHandler>(IamGetAccountsQueryHandler);
        service = module.get<IamGetAccountsService>(IamGetAccountsService);
        repository = <IamMockAccountRepository>module.get<IamIAccountRepository>(IamIAccountRepository);
        mapper = new IamAccountMapper();
    });

    describe('main', () =>
    {
        test('IamGetAccountsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accounts founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamGetAccountsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});