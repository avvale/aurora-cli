import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AuditingFindHttpCommunicationService } from './auditing-find-http-communication.service';
import { AuditingIHttpCommunicationRepository } from '../../domain/auditing-http-communication.repository';
import { AuditingMockHttpCommunicationRepository } from '../../infrastructure/mock/auditing-mock-http-communication.repository';

describe('AuditingFindHttpCommunicationService', () =>
{
    let service: AuditingFindHttpCommunicationService;
    let repository: AuditingIHttpCommunicationRepository;
    let mockRepository: AuditingMockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AuditingFindHttpCommunicationService,
                AuditingMockHttpCommunicationRepository,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingFindHttpCommunicationService);
        repository = module.get(AuditingIHttpCommunicationRepository);
        mockRepository = module.get(AuditingMockHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('AuditingFindHttpCommunicationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find httpCommunication', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
