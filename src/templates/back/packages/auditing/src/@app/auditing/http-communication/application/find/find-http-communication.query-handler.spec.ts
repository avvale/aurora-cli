import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindHttpCommunicationQueryHandler } from './find-http-communication.query-handler';
import { MockHttpCommunicationRepository } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.repository';
import { IHttpCommunicationRepository } from '@app/auditing/http-communication/domain/http-communication.repository';
import { HttpCommunicationMapper } from '@app/auditing/http-communication/domain/http-communication.mapper';
import { FindHttpCommunicationQuery } from './find-http-communication.query';
import { FindHttpCommunicationService } from './find-http-communication.service';

describe('FindHttpCommunicationQueryHandler', () =>
{
    let queryHandler: FindHttpCommunicationQueryHandler;
    let service: FindHttpCommunicationService;
    let repository: MockHttpCommunicationRepository;
    let mapper: HttpCommunicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindHttpCommunicationQueryHandler,
                {
                    provide : IHttpCommunicationRepository,
                    useClass: MockHttpCommunicationRepository,
                },
                {
                    provide : FindHttpCommunicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindHttpCommunicationQueryHandler>(FindHttpCommunicationQueryHandler);
        service         = module.get<FindHttpCommunicationService>(FindHttpCommunicationService);
        repository      = <MockHttpCommunicationRepository>module.get<IHttpCommunicationRepository>(IHttpCommunicationRepository);
        mapper          = new HttpCommunicationMapper();
    });

    describe('main', () =>
    {
        test('FindHttpCommunicationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an httpCommunication founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindHttpCommunicationQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});