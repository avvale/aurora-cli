/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateApplicationsService } from './create-applications.service';
import { IApplicationRepository } from '../../domain/application.repository';
import { MockApplicationRepository } from '../../infrastructure/mock/mock-application.repository';

describe('CreateApplicationsService', () =>
{
    let service: CreateApplicationsService;
    let repository: IApplicationRepository;
    let mockRepository: MockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateApplicationsService,
                MockApplicationRepository,
                {
                    provide : IApplicationRepository,
                    useValue: {
                        insert: (items) => { /**/ },
                    },
                },
            ]
        }).compile();

        service         = module.get(CreateApplicationsService);
        repository      = module.get(IApplicationRepository);
        mockRepository  = module.get(MockApplicationRepository);
    });

    describe('main', () =>
    {
        test('CreateApplicationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create applications and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource,
            )).toBe(undefined);
        });
    });
});