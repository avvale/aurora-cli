import {
    IamCountAccountQuery,
    IamIAccountRepository,
    IamMockAccountRepository,
} from '@app/iam/account';
import { IamCountAccountQueryHandler } from '@app/iam/account/application/count/iam-count-account.query-handler';
import { IamCountAccountService } from '@app/iam/account/application/count/iam-count-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountAccountQueryHandler', () => {
    let queryHandler: IamCountAccountQueryHandler;
    let service: IamCountAccountService;
    let repository: IamMockAccountRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCountAccountQueryHandler,
                {
                    provide: IamIAccountRepository,
                    useClass: IamMockAccountRepository,
                },
                {
                    provide: IamCountAccountService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<IamCountAccountQueryHandler>(
            IamCountAccountQueryHandler,
        );
        service = module.get<IamCountAccountService>(IamCountAccountService);
        repository = <IamMockAccountRepository>(
            module.get<IamIAccountRepository>(IamIAccountRepository)
        );
    });

    describe('main', () => {
        test('IamCountAccountQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource.length),
                    ),
            );
            expect(
                await queryHandler.execute(new IamCountAccountQuery()),
            ).toStrictEqual(repository.collectionSource.length);
        });
    });
});
