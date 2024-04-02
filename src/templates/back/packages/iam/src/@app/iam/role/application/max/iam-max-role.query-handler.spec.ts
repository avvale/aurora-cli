import { IamIRoleRepository, IamMaxRoleQuery, IamMockRoleRepository } from '@app/iam/role';
import { IamMaxRoleQueryHandler } from '@app/iam/role/application/max/iam-max-role.query-handler';
import { IamMaxRoleService } from '@app/iam/role/application/max/iam-max-role.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxRoleQueryHandler', () =>
{
    let queryHandler: IamMaxRoleQueryHandler;
    let service: IamMaxRoleService;
    let repository: IamMockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMaxRoleQueryHandler,
                {
                    provide : IamIRoleRepository,
                    useClass: IamMockRoleRepository,
                },
                {
                    provide : IamMaxRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMaxRoleQueryHandler>(IamMaxRoleQueryHandler);
        service = module.get<IamMaxRoleService>(IamMaxRoleService);
        repository = <IamMockRoleRepository>module.get<IamIRoleRepository>(IamIRoleRepository);
    });

    describe('main', () =>
    {
        test('IamMaxRoleQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new IamMaxRoleQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
