import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindHttpCommunicationByIdQueryHandler } from './find-http-communication-by-id.query-handler';
import { MockHttpCommunicationRepository } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.repository';
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';
import { IHttpCommunicationRepository } from '@app/auditing/http-communication/domain/http-communication.repository';
import { HttpCommunicationMapper } from '@app/auditing/http-communication/domain/http-communication.mapper';
import { FindHttpCommunicationByIdQuery } from './find-http-communication-by-id.query';
import { FindHttpCommunicationByIdService } from './find-http-communication-by-id.service';

describe('FindHttpCommunicationByIdQueryHandler', () =>
{
    let queryHandler: FindHttpCommunicationByIdQueryHandler;
    let service: FindHttpCommunicationByIdService;
    let repository: MockHttpCommunicationRepository;
    let mapper: HttpCommunicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindHttpCommunicationByIdQueryHandler,
                {
                    provide : IHttpCommunicationRepository,
                    useClass: MockHttpCommunicationRepository,
                },
                {
                    provide : FindHttpCommunicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<FindHttpCommunicationByIdQueryHandler>(FindHttpCommunicationByIdQueryHandler);
        service = module.get<FindHttpCommunicationByIdService>(FindHttpCommunicationByIdService);
        repository = <MockHttpCommunicationRepository>module.get<IHttpCommunicationRepository>(IHttpCommunicationRepository);
        mapper = new HttpCommunicationMapper();
    });

    describe('main', () =>
    {
        test('FindHttpCommunicationByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an httpCommunication founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindHttpCommunicationByIdQuery(
                    httpCommunications[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});