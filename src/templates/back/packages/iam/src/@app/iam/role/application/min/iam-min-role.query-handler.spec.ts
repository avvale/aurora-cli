import { IamIRoleRepository, IamMinRoleQuery, IamMockRoleRepository } from '@app/iam/role';
import { IamMinRoleQueryHandler } from '@app/iam/role/application/min/iam-min-role.query-handler';
import { IamMinRoleService } from '@app/iam/role/application/min/iam-min-role.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinRoleQueryHandler', () =>
{
    let queryHandler: IamMinRoleQueryHandler;
    let service: IamMinRoleService;
    let repository: IamMockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMinRoleQueryHandler,
                {
                    provide : IamIRoleRepository,
                    useClass: IamMockRoleRepository,
                },
                {
                    provide : IamMinRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMinRoleQueryHandler>(IamMinRoleQueryHandler);
        service = module.get<IamMinRoleService>(IamMinRoleService);
        repository = <IamMockRoleRepository>module.get<IamIRoleRepository>(IamIRoleRepository);
    });

    describe('main', () =>
    {
        test('IamMinRoleQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new IamMinRoleQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
