import { IamIRoleRepository, IamMockRoleRepository, IamSumRoleQuery } from '@app/iam/role';
import { IamSumRoleQueryHandler } from '@app/iam/role/application/sum/iam-sum-role.query-handler';
import { IamSumRoleService } from '@app/iam/role/application/sum/iam-sum-role.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamSumRoleQueryHandler', () =>
{
    let queryHandler: IamSumRoleQueryHandler;
    let service: IamSumRoleService;
    let repository: IamMockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamSumRoleQueryHandler,
                {
                    provide : IamIRoleRepository,
                    useClass: IamMockRoleRepository,
                },
                {
                    provide : IamSumRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamSumRoleQueryHandler>(IamSumRoleQueryHandler);
        service = module.get<IamSumRoleService>(IamSumRoleService);
        repository = <IamMockRoleRepository>module.get<IamIRoleRepository>(IamIRoleRepository);
    });

    describe('main', () =>
    {
        test('IamSumRoleQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new IamSumRoleQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
