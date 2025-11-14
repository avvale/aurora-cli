/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AuditingDeleteHttpCommunicationByIdHandler,
    AuditingDeleteHttpCommunicationByIdResolver,
} from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteHttpCommunicationByIdResolver', () => {
    let resolver: AuditingDeleteHttpCommunicationByIdResolver;
    let handler: AuditingDeleteHttpCommunicationByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                AuditingDeleteHttpCommunicationByIdResolver,
                {
                    provide: AuditingDeleteHttpCommunicationByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<AuditingDeleteHttpCommunicationByIdResolver>(
            AuditingDeleteHttpCommunicationByIdResolver,
        );
        handler = module.get<AuditingDeleteHttpCommunicationByIdHandler>(
            AuditingDeleteHttpCommunicationByIdHandler,
        );
    });

    test('AuditingDeleteHttpCommunicationByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('AuditingDeleteHttpCommunicationByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an httpCommunication deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockHttpCommunicationData[0]),
                    ),
            );
            expect(
                await resolver.main(auditingMockHttpCommunicationData[0].id),
            ).toBe(auditingMockHttpCommunicationData[0]);
        });
    });
});
