import { IamIRoleRepository, IamMockRoleRepository } from '@app/iam/role';
import { IamPaginateRolesService } from '@app/iam/role/application/paginate/iam-paginate-roles.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateRolesService', () =>
{
    let service: IamPaginateRolesService;
    let repository: IamIRoleRepository;
    let mockRepository: IamMockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamPaginateRolesService,
                IamMockRoleRepository,
                {
                    provide : IamIRoleRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamPaginateRolesService);
        repository = module.get(IamIRoleRepository);
        mockRepository = module.get(IamMockRoleRepository);
    });

    describe('main', () =>
    {
        test('IamPaginateRolesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate roles', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});
