import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindAccountQueryHandler } from './iam-find-account.query-handler';
import { IamMockAccountRepository } from '@app/iam/account/infrastructure/mock/iam-mock-account.repository';
import { IamIAccountRepository } from '@app/iam/account/domain/iam-account.repository';
import { IamAccountMapper } from '@app/iam/account/domain/iam-account.mapper';
import { IamFindAccountQuery } from './iam-find-account.query';
import { IamFindAccountService } from './iam-find-account.service';

describe('IamFindAccountQueryHandler', () =>
{
    let queryHandler: IamFindAccountQueryHandler;
    let service: IamFindAccountService;
    let repository: IamMockAccountRepository;
    let mapper: IamAccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindAccountQueryHandler,
                {
                    provide : IamIAccountRepository,
                    useClass: IamMockAccountRepository,
                },
                {
                    provide : IamFindAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamFindAccountQueryHandler>(IamFindAccountQueryHandler);
        service = module.get<IamFindAccountService>(IamFindAccountService);
        repository = <IamMockAccountRepository>module.get<IamIAccountRepository>(IamIAccountRepository);
        mapper = new IamAccountMapper();
    });

    describe('main', () =>
    {
        test('IamFindAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an account founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new IamFindAccountQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
