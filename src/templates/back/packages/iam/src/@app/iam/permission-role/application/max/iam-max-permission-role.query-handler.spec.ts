import { IamIPermissionRoleRepository, IamMaxPermissionRoleQuery, IamMockPermissionRoleRepository } from '@app/iam/permission-role';
import { IamMaxPermissionRoleQueryHandler } from '@app/iam/permission-role/application/max/iam-max-permission-role.query-handler';
import { IamMaxPermissionRoleService } from '@app/iam/permission-role/application/max/iam-max-permission-role.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxPermissionRoleQueryHandler', () =>
{
    let queryHandler: IamMaxPermissionRoleQueryHandler;
    let service: IamMaxPermissionRoleService;
    let repository: IamMockPermissionRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMaxPermissionRoleQueryHandler,
                {
                    provide : IamIPermissionRoleRepository,
                    useClass: IamMockPermissionRoleRepository,
                },
                {
                    provide : IamMaxPermissionRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMaxPermissionRoleQueryHandler>(IamMaxPermissionRoleQueryHandler);
        service = module.get<IamMaxPermissionRoleService>(IamMaxPermissionRoleService);
        repository = <IamMockPermissionRoleRepository>module.get<IamIPermissionRoleRepository>(IamIPermissionRoleRepository);
    });

    describe('main', () =>
    {
        test('IamMaxPermissionRoleQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new IamMaxPermissionRoleQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
