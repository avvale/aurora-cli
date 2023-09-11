import { IamIRoleRepository, IamMockRoleRepository } from '@app/iam/role';
import { IamRawSQLRolesService } from '@app/iam/role/application/raw-sql/iam-raw-sql-roles.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamRawSQLRolesService ', () =>
{
    let service: IamRawSQLRolesService ;
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
                IamRawSQLRolesService ,
                IamMockRoleRepository,
                {
                    provide : IamIRoleRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(IamRawSQLRolesService );
        repository      = module.get(IamIRoleRepository);
        mockRepository  = module.get(IamMockRoleRepository);
    });

    describe('main', () =>
    {
        test('RawSQLRolesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get roles', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
