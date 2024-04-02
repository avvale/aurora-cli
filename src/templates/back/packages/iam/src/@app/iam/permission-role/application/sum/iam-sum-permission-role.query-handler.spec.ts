import { IamIPermissionRoleRepository, IamMockPermissionRoleRepository, IamSumPermissionRoleQuery } from '@app/iam/permission-role';
import { IamSumPermissionRoleQueryHandler } from '@app/iam/permission-role/application/sum/iam-sum-permission-role.query-handler';
import { IamSumPermissionRoleService } from '@app/iam/permission-role/application/sum/iam-sum-permission-role.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamSumPermissionRoleQueryHandler', () =>
{
    let queryHandler: IamSumPermissionRoleQueryHandler;
    let service: IamSumPermissionRoleService;
    let repository: IamMockPermissionRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamSumPermissionRoleQueryHandler,
                {
                    provide : IamIPermissionRoleRepository,
                    useClass: IamMockPermissionRoleRepository,
                },
                {
                    provide : IamSumPermissionRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamSumPermissionRoleQueryHandler>(IamSumPermissionRoleQueryHandler);
        service = module.get<IamSumPermissionRoleService>(IamSumPermissionRoleService);
        repository = <IamMockPermissionRoleRepository>module.get<IamIPermissionRoleRepository>(IamIPermissionRoleRepository);
    });

    describe('main', () =>
    {
        test('IamSumPermissionRoleQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new IamSumPermissionRoleQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
