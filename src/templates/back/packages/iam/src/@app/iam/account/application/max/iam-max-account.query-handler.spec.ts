import { IamIAccountRepository, IamMaxAccountQuery, IamMockAccountRepository } from '@app/iam/account';
import { IamMaxAccountQueryHandler } from '@app/iam/account/application/max/iam-max-account.query-handler';
import { IamMaxAccountService } from '@app/iam/account/application/max/iam-max-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxAccountQueryHandler', () =>
{
    let queryHandler: IamMaxAccountQueryHandler;
    let service: IamMaxAccountService;
    let repository: IamMockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMaxAccountQueryHandler,
                {
                    provide : IamIAccountRepository,
                    useClass: IamMockAccountRepository,
                },
                {
                    provide : IamMaxAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMaxAccountQueryHandler>(IamMaxAccountQueryHandler);
        service = module.get<IamMaxAccountService>(IamMaxAccountService);
        repository = <IamMockAccountRepository>module.get<IamIAccountRepository>(IamIAccountRepository);
    });

    describe('main', () =>
    {
        test('IamMaxAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new IamMaxAccountQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
