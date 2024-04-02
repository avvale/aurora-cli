import { IamIRoleAccountRepository, IamMaxRoleAccountQuery, IamMockRoleAccountRepository } from '@app/iam/role-account';
import { IamMaxRoleAccountQueryHandler } from '@app/iam/role-account/application/max/iam-max-role-account.query-handler';
import { IamMaxRoleAccountService } from '@app/iam/role-account/application/max/iam-max-role-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxRoleAccountQueryHandler', () =>
{
    let queryHandler: IamMaxRoleAccountQueryHandler;
    let service: IamMaxRoleAccountService;
    let repository: IamMockRoleAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMaxRoleAccountQueryHandler,
                {
                    provide : IamIRoleAccountRepository,
                    useClass: IamMockRoleAccountRepository,
                },
                {
                    provide : IamMaxRoleAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMaxRoleAccountQueryHandler>(IamMaxRoleAccountQueryHandler);
        service = module.get<IamMaxRoleAccountService>(IamMaxRoleAccountService);
        repository = <IamMockRoleAccountRepository>module.get<IamIRoleAccountRepository>(IamIRoleAccountRepository);
    });

    describe('main', () =>
    {
        test('IamMaxRoleAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new IamMaxRoleAccountQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
