import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { users } from '../../../../../@apps/iam/user/infrastructure/seeds/user.seed';
import { FindUserByIdService } from './find-user-by-id.service';
import { UserId } from '../../domain/value-objects';
import { IUserRepository } from '../../domain/user.repository';
import { MockUserRepository } from '../../infrastructure/mock/mock-user.repository';

describe('FindUserByIdService', () =>
{
    let service: FindUserByIdService;
    let repository: IUserRepository;
    let mockRepository: MockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindUserByIdService,
                MockUserRepository,
                {
                    provide: IUserRepository,
                    useValue: {
                        findById: id => { /**/ }
                    }
                }
            ]
        }).compile();

        service         = module.get(FindUserByIdService);
        repository      = module.get(IUserRepository);
        mockRepository  = module.get(MockUserRepository);
    });

    describe('main', () =>
    {
        test('FindUserByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find user by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new UserId(users[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});