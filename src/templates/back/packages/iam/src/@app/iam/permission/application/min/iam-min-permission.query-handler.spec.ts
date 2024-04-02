import { IamIPermissionRepository, IamMinPermissionQuery, IamMockPermissionRepository } from '@app/iam/permission';
import { IamMinPermissionQueryHandler } from '@app/iam/permission/application/min/iam-min-permission.query-handler';
import { IamMinPermissionService } from '@app/iam/permission/application/min/iam-min-permission.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinPermissionQueryHandler', () =>
{
    let queryHandler: IamMinPermissionQueryHandler;
    let service: IamMinPermissionService;
    let repository: IamMockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMinPermissionQueryHandler,
                {
                    provide : IamIPermissionRepository,
                    useClass: IamMockPermissionRepository,
                },
                {
                    provide : IamMinPermissionService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMinPermissionQueryHandler>(IamMinPermissionQueryHandler);
        service = module.get<IamMinPermissionService>(IamMinPermissionService);
        repository = <IamMockPermissionRepository>module.get<IamIPermissionRepository>(IamIPermissionRepository);
    });

    describe('main', () =>
    {
        test('IamMinPermissionQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new IamMinPermissionQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
