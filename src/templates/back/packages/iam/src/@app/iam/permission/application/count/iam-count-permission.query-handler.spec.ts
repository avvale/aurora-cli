import { IamCountPermissionQuery, IamIPermissionRepository, IamMockPermissionRepository } from '@app/iam/permission';
import { IamCountPermissionQueryHandler } from '@app/iam/permission/application/count/iam-count-permission.query-handler';
import { IamCountPermissionService } from '@app/iam/permission/application/count/iam-count-permission.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountPermissionQueryHandler', () =>
{
    let queryHandler: IamCountPermissionQueryHandler;
    let service: IamCountPermissionService;
    let repository: IamMockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCountPermissionQueryHandler,
                {
                    provide : IamIPermissionRepository,
                    useClass: IamMockPermissionRepository,
                },
                {
                    provide : IamCountPermissionService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamCountPermissionQueryHandler>(IamCountPermissionQueryHandler);
        service = module.get<IamCountPermissionService>(IamCountPermissionService);
        repository = <IamMockPermissionRepository>module.get<IamIPermissionRepository>(IamIPermissionRepository);
    });

    describe('main', () =>
    {
        test('IamCountPermissionQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new IamCountPermissionQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
