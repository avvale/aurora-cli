import { IamIPermissionRoleRepository, IamMinPermissionRoleQuery, IamMockPermissionRoleRepository } from '@app/iam/permission-role';
import { IamMinPermissionRoleQueryHandler } from '@app/iam/permission-role/application/min/iam-min-permission-role.query-handler';
import { IamMinPermissionRoleService } from '@app/iam/permission-role/application/min/iam-min-permission-role.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinPermissionRoleQueryHandler', () =>
{
    let queryHandler: IamMinPermissionRoleQueryHandler;
    let service: IamMinPermissionRoleService;
    let repository: IamMockPermissionRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMinPermissionRoleQueryHandler,
                {
                    provide : IamIPermissionRoleRepository,
                    useClass: IamMockPermissionRoleRepository,
                },
                {
                    provide : IamMinPermissionRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMinPermissionRoleQueryHandler>(IamMinPermissionRoleQueryHandler);
        service = module.get<IamMinPermissionRoleService>(IamMinPermissionRoleService);
        repository = <IamMockPermissionRoleRepository>module.get<IamIPermissionRoleRepository>(IamIPermissionRoleRepository);
    });

    describe('main', () =>
    {
        test('IamMinPermissionRoleQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new IamMinPermissionRoleQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
