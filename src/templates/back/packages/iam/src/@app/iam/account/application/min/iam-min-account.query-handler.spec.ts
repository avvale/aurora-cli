import { IamIAccountRepository, IamMinAccountQuery, IamMockAccountRepository } from '@app/iam/account';
import { IamMinAccountQueryHandler } from '@app/iam/account/application/min/iam-min-account.query-handler';
import { IamMinAccountService } from '@app/iam/account/application/min/iam-min-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinAccountQueryHandler', () =>
{
    let queryHandler: IamMinAccountQueryHandler;
    let service: IamMinAccountService;
    let repository: IamMockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMinAccountQueryHandler,
                {
                    provide : IamIAccountRepository,
                    useClass: IamMockAccountRepository,
                },
                {
                    provide : IamMinAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMinAccountQueryHandler>(IamMinAccountQueryHandler);
        service = module.get<IamMinAccountService>(IamMinAccountService);
        repository = <IamMockAccountRepository>module.get<IamIAccountRepository>(IamIAccountRepository);
    });

    describe('main', () =>
    {
        test('IamMinAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new IamMinAccountQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
