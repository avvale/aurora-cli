import { IamIRoleAccountRepository, IamMinRoleAccountQuery, IamMockRoleAccountRepository } from '@app/iam/role-account';
import { IamMinRoleAccountQueryHandler } from '@app/iam/role-account/application/min/iam-min-role-account.query-handler';
import { IamMinRoleAccountService } from '@app/iam/role-account/application/min/iam-min-role-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinRoleAccountQueryHandler', () =>
{
    let queryHandler: IamMinRoleAccountQueryHandler;
    let service: IamMinRoleAccountService;
    let repository: IamMockRoleAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMinRoleAccountQueryHandler,
                {
                    provide : IamIRoleAccountRepository,
                    useClass: IamMockRoleAccountRepository,
                },
                {
                    provide : IamMinRoleAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMinRoleAccountQueryHandler>(IamMinRoleAccountQueryHandler);
        service = module.get<IamMinRoleAccountService>(IamMinRoleAccountService);
        repository = <IamMockRoleAccountRepository>module.get<IamIRoleAccountRepository>(IamIRoleAccountRepository);
    });

    describe('main', () =>
    {
        test('IamMinRoleAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new IamMinRoleAccountQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
