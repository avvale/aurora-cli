/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { users } from '../../../../../@apps/iam/user/infrastructure/seeds/user.seed';
import { DeleteUserByIdService } from './delete-user-by-id.service';
import { UserId } from '../../domain/value-objects';
import { IUserRepository } from '../../domain/user.repository';
import { MockUserRepository } from '../../infrastructure/mock/mock-user.repository';

describe('DeleteUserByIdService', () =>
{
    let service: DeleteUserByIdService;
    let repository: IUserRepository;
    let mockRepository: MockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteUserByIdService,
                MockUserRepository,
                {
                    provide : IUserRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    }
                },
            ]
        }).compile();

        service         = module.get(DeleteUserByIdService);
        repository      = module.get(IUserRepository);
        mockRepository  = module.get(MockUserRepository);
    });

    describe('main', () =>
    {
        test('DeleteUserByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete user and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new UserId(users[0].id)
            )).toBe(undefined);
        });
    });
});