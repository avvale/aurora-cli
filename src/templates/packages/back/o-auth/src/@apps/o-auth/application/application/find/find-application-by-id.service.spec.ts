import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { applications } from '@app/o-auth/application/infrastructure/seeds/application.seed';
import { FindApplicationByIdService } from './find-application-by-id.service';
import { ApplicationId } from '../../domain/value-objects';
import { IApplicationRepository } from '../../domain/application.repository';
import { MockApplicationRepository } from '../../infrastructure/mock/mock-application.repository';

describe('FindApplicationByIdService', () =>
{
    let service: FindApplicationByIdService;
    let repository: IApplicationRepository;
    let mockRepository: MockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindApplicationByIdService,
                MockApplicationRepository,
                {
                    provide : IApplicationRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(FindApplicationByIdService);
        repository      = module.get(IApplicationRepository);
        mockRepository  = module.get(MockApplicationRepository);
    });

    describe('main', () =>
    {
        test('FindApplicationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find application by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ApplicationId(applications[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});