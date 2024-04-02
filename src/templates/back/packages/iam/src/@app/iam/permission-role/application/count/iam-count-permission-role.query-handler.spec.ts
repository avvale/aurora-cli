import { IamCountPermissionRoleQuery, IamIPermissionRoleRepository, IamMockPermissionRoleRepository } from '@app/iam/permission-role';
import { IamCountPermissionRoleQueryHandler } from '@app/iam/permission-role/application/count/iam-count-permission-role.query-handler';
import { IamCountPermissionRoleService } from '@app/iam/permission-role/application/count/iam-count-permission-role.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountPermissionRoleQueryHandler', () =>
{
    let queryHandler: IamCountPermissionRoleQueryHandler;
    let service: IamCountPermissionRoleService;
    let repository: IamMockPermissionRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCountPermissionRoleQueryHandler,
                {
                    provide : IamIPermissionRoleRepository,
                    useClass: IamMockPermissionRoleRepository,
                },
                {
                    provide : IamCountPermissionRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamCountPermissionRoleQueryHandler>(IamCountPermissionRoleQueryHandler);
        service = module.get<IamCountPermissionRoleService>(IamCountPermissionRoleService);
        repository = <IamMockPermissionRoleRepository>module.get<IamIPermissionRoleRepository>(IamIPermissionRoleRepository);
    });

    describe('main', () =>
    {
        test('IamCountPermissionRoleQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new IamCountPermissionRoleQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
