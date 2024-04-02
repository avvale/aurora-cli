import { IamIPermissionRepository, IamMockPermissionRepository, IamSumPermissionQuery } from '@app/iam/permission';
import { IamSumPermissionQueryHandler } from '@app/iam/permission/application/sum/iam-sum-permission.query-handler';
import { IamSumPermissionService } from '@app/iam/permission/application/sum/iam-sum-permission.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamSumPermissionQueryHandler', () =>
{
    let queryHandler: IamSumPermissionQueryHandler;
    let service: IamSumPermissionService;
    let repository: IamMockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamSumPermissionQueryHandler,
                {
                    provide : IamIPermissionRepository,
                    useClass: IamMockPermissionRepository,
                },
                {
                    provide : IamSumPermissionService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamSumPermissionQueryHandler>(IamSumPermissionQueryHandler);
        service = module.get<IamSumPermissionService>(IamSumPermissionService);
        repository = <IamMockPermissionRepository>module.get<IamIPermissionRepository>(IamIPermissionRepository);
    });

    describe('main', () =>
    {
        test('IamSumPermissionQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new IamSumPermissionQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
