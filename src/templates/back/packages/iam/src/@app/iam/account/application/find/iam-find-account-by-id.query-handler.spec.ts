import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindAccountByIdQueryHandler } from './iam-find-account-by-id.query-handler';
import { IamMockAccountRepository } from '@app/iam/account/infrastructure/mock/iam-mock-account.repository';
import { iamMockAccountData } from '@app/iam/account/infrastructure/mock/iam-mock-account.data';
import { IamIAccountRepository } from '@app/iam/account/domain/iam-account.repository';
import { IamAccountMapper } from '@app/iam/account/domain/iam-account.mapper';
import { IamFindAccountByIdQuery } from './iam-find-account-by-id.query';
import { IamFindAccountByIdService } from './iam-find-account-by-id.service';

describe('IamFindAccountByIdQueryHandler', () =>
{
    let queryHandler: IamFindAccountByIdQueryHandler;
    let service: IamFindAccountByIdService;
    let repository: IamMockAccountRepository;
    let mapper: IamAccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindAccountByIdQueryHandler,
                {
                    provide : IamIAccountRepository,
                    useClass: IamMockAccountRepository,
                },
                {
                    provide : IamFindAccountByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamFindAccountByIdQueryHandler>(IamFindAccountByIdQueryHandler);
        service = module.get<IamFindAccountByIdService>(IamFindAccountByIdService);
        repository = <IamMockAccountRepository>module.get<IamIAccountRepository>(IamIAccountRepository);
        mapper = new IamAccountMapper();
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
                new IamFindAccountByIdQuery(
                    iamMockAccountData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
