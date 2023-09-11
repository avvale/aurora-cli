import { IamIUserRepository, IamMockUserRepository } from '@app/iam/user';
import { IamRawSQLUsersService } from '@app/iam/user/application/raw-sql/iam-raw-sql-users.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamRawSQLUsersService ', () =>
{
    let service: IamRawSQLUsersService ;
    let repository: IamIUserRepository;
    let mockRepository: IamMockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamRawSQLUsersService ,
                IamMockUserRepository,
                {
                    provide : IamIUserRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(IamRawSQLUsersService );
        repository      = module.get(IamIUserRepository);
        mockRepository  = module.get(IamMockUserRepository);
    });

    describe('main', () =>
    {
        test('RawSQLUsersService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get users', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
