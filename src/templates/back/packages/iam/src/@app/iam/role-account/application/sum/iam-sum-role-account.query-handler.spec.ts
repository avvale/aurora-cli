import { IamIRoleAccountRepository, IamMockRoleAccountRepository, IamSumRoleAccountQuery } from '@app/iam/role-account';
import { IamSumRoleAccountQueryHandler } from '@app/iam/role-account/application/sum/iam-sum-role-account.query-handler';
import { IamSumRoleAccountService } from '@app/iam/role-account/application/sum/iam-sum-role-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamSumRoleAccountQueryHandler', () =>
{
    let queryHandler: IamSumRoleAccountQueryHandler;
    let service: IamSumRoleAccountService;
    let repository: IamMockRoleAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamSumRoleAccountQueryHandler,
                {
                    provide : IamIRoleAccountRepository,
                    useClass: IamMockRoleAccountRepository,
                },
                {
                    provide : IamSumRoleAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamSumRoleAccountQueryHandler>(IamSumRoleAccountQueryHandler);
        service = module.get<IamSumRoleAccountService>(IamSumRoleAccountService);
        repository = <IamMockRoleAccountRepository>module.get<IamIRoleAccountRepository>(IamIRoleAccountRepository);
    });

    describe('main', () =>
    {
        test('IamSumRoleAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new IamSumRoleAccountQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
