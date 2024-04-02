import { IamCountRoleAccountQuery, IamIRoleAccountRepository, IamMockRoleAccountRepository } from '@app/iam/role-account';
import { IamCountRoleAccountQueryHandler } from '@app/iam/role-account/application/count/iam-count-role-account.query-handler';
import { IamCountRoleAccountService } from '@app/iam/role-account/application/count/iam-count-role-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountRoleAccountQueryHandler', () =>
{
    let queryHandler: IamCountRoleAccountQueryHandler;
    let service: IamCountRoleAccountService;
    let repository: IamMockRoleAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCountRoleAccountQueryHandler,
                {
                    provide : IamIRoleAccountRepository,
                    useClass: IamMockRoleAccountRepository,
                },
                {
                    provide : IamCountRoleAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamCountRoleAccountQueryHandler>(IamCountRoleAccountQueryHandler);
        service = module.get<IamCountRoleAccountService>(IamCountRoleAccountService);
        repository = <IamMockRoleAccountRepository>module.get<IamIRoleAccountRepository>(IamIRoleAccountRepository);
    });

    describe('main', () =>
    {
        test('IamCountRoleAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new IamCountRoleAccountQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
