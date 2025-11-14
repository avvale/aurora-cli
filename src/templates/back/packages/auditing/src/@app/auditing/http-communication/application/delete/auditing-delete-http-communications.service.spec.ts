/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AuditingIHttpCommunicationRepository,
    AuditingMockHttpCommunicationRepository,
} from '@app/auditing/http-communication';
import { AuditingDeleteHttpCommunicationsService } from '@app/auditing/http-communication/application/delete/auditing-delete-http-communications.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteHttpCommunicationsService', () => {
    let service: AuditingDeleteHttpCommunicationsService;
    let repository: AuditingIHttpCommunicationRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AuditingDeleteHttpCommunicationsService,
                AuditingMockHttpCommunicationRepository,
                {
                    provide: AuditingIHttpCommunicationRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                        delete: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(AuditingDeleteHttpCommunicationsService);
        repository = module.get(AuditingIHttpCommunicationRepository);
    });

    describe('main', () => {
        test('AuditingDeleteHttpCommunicationsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete httpCommunication and emit event', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () => new Promise((resolve) => resolve([])),
            );
            expect(await service.main({}, {})).toBe(undefined);
        });
    });
});
