import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AuditingGetHttpCommunicationsService } from './auditing-get-http-communications.service';
import { AuditingIHttpCommunicationRepository } from '../../domain/auditing-http-communication.repository';
import { AuditingMockHttpCommunicationRepository } from '../../infrastructure/mock/auditing-mock-http-communication.repository';

describe('AuditingGetHttpCommunicationsService', () =>
{
    let service: AuditingGetHttpCommunicationsService;
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
                AuditingGetHttpCommunicationsService,
                AuditingMockHttpCommunicationRepository,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingGetHttpCommunicationsService);
        repository = module.get(AuditingIHttpCommunicationRepository);
        mockRepository = module.get(AuditingMockHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('GetHttpCommunicationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get httpCommunications', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
