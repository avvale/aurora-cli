import {
    IamAccountMapper,
    IamFindAccountQuery,
    IamIAccountRepository,
    IamMockAccountRepository,
} from '@app/iam/account';
import { IamFindAccountQueryHandler } from '@app/iam/account/application/find/iam-find-account.query-handler';
import { IamFindAccountService } from '@app/iam/account/application/find/iam-find-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindAccountQueryHandler', () => {
    let queryHandler: IamFindAccountQueryHandler;
    let service: IamFindAccountService;
    let repository: IamMockAccountRepository;
    let mapper: IamAccountMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindAccountQueryHandler,
                {
                    provide: IamIAccountRepository,
                    useClass: IamMockAccountRepository,
                },
                {
                    provide: IamFindAccountService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<IamFindAccountQueryHandler>(
            IamFindAccountQueryHandler,
        );
        service = module.get<IamFindAccountService>(IamFindAccountService);
        repository = <IamMockAccountRepository>(
            module.get<IamIAccountRepository>(IamIAccountRepository)
        );
        mapper = new IamAccountMapper();
    });

    describe('main', () => {
        test('IamFindAccountQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an account founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(new IamFindAccountQuery()),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
