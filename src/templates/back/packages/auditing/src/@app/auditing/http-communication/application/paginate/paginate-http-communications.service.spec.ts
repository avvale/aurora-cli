import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { PaginateHttpCommunicationsService } from './paginate-http-communications.service';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { MockHttpCommunicationRepository } from '../../infrastructure/mock/mock-http-communication.repository';

describe('PaginateHttpCommunicationsService', () =>
{
    let service: PaginateHttpCommunicationsService;
    let repository: IHttpCommunicationRepository;
    let mockRepository: MockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateHttpCommunicationsService,
                MockHttpCommunicationRepository,
                {
                    provide : IHttpCommunicationRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(PaginateHttpCommunicationsService);
        repository = module.get(IHttpCommunicationRepository);
        mockRepository = module.get(MockHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('PaginateHttpCommunicationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate httpCommunications', async () =>
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