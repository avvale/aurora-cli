import { IamIAccountRepository, IamMockAccountRepository, IamSumAccountQuery } from '@app/iam/account';
import { IamSumAccountQueryHandler } from '@app/iam/account/application/sum/iam-sum-account.query-handler';
import { IamSumAccountService } from '@app/iam/account/application/sum/iam-sum-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamSumAccountQueryHandler', () =>
{
    let queryHandler: IamSumAccountQueryHandler;
    let service: IamSumAccountService;
    let repository: IamMockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamSumAccountQueryHandler,
                {
                    provide : IamIAccountRepository,
                    useClass: IamMockAccountRepository,
                },
                {
                    provide : IamSumAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamSumAccountQueryHandler>(IamSumAccountQueryHandler);
        service = module.get<IamSumAccountService>(IamSumAccountService);
        repository = <IamMockAccountRepository>module.get<IamIAccountRepository>(IamIAccountRepository);
    });

    describe('main', () =>
    {
        test('IamSumAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new IamSumAccountQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
