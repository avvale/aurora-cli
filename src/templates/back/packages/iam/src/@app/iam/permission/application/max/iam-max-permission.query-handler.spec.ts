import { IamIPermissionRepository, IamMaxPermissionQuery, IamMockPermissionRepository } from '@app/iam/permission';
import { IamMaxPermissionQueryHandler } from '@app/iam/permission/application/max/iam-max-permission.query-handler';
import { IamMaxPermissionService } from '@app/iam/permission/application/max/iam-max-permission.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxPermissionQueryHandler', () =>
{
    let queryHandler: IamMaxPermissionQueryHandler;
    let service: IamMaxPermissionService;
    let repository: IamMockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMaxPermissionQueryHandler,
                {
                    provide : IamIPermissionRepository,
                    useClass: IamMockPermissionRepository,
                },
                {
                    provide : IamMaxPermissionService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMaxPermissionQueryHandler>(IamMaxPermissionQueryHandler);
        service = module.get<IamMaxPermissionService>(IamMaxPermissionService);
        repository = <IamMockPermissionRepository>module.get<IamIPermissionRepository>(IamIPermissionRepository);
    });

    describe('main', () =>
    {
        test('IamMaxPermissionQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new IamMaxPermissionQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
