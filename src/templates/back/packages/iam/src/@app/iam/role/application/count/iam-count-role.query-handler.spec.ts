import { IamCountRoleQuery, IamIRoleRepository, IamMockRoleRepository } from '@app/iam/role';
import { IamCountRoleQueryHandler } from '@app/iam/role/application/count/iam-count-role.query-handler';
import { IamCountRoleService } from '@app/iam/role/application/count/iam-count-role.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountRoleQueryHandler', () =>
{
    let queryHandler: IamCountRoleQueryHandler;
    let service: IamCountRoleService;
    let repository: IamMockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCountRoleQueryHandler,
                {
                    provide : IamIRoleRepository,
                    useClass: IamMockRoleRepository,
                },
                {
                    provide : IamCountRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamCountRoleQueryHandler>(IamCountRoleQueryHandler);
        service = module.get<IamCountRoleService>(IamCountRoleService);
        repository = <IamMockRoleRepository>module.get<IamIRoleRepository>(IamIRoleRepository);
    });

    describe('main', () =>
    {
        test('IamCountRoleQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new IamCountRoleQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
