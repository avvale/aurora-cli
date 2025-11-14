/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AuditingCreateHttpCommunicationHandler,
    AuditingCreateHttpCommunicationResolver,
} from '@api/auditing/http-communication';
import { AuditingCreateHttpCommunicationInput } from '@api/graphql';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateHttpCommunicationResolver', () => {
    let resolver: AuditingCreateHttpCommunicationResolver;
    let handler: AuditingCreateHttpCommunicationHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                AuditingCreateHttpCommunicationResolver,
                {
                    provide: AuditingCreateHttpCommunicationHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<AuditingCreateHttpCommunicationResolver>(
            AuditingCreateHttpCommunicationResolver,
        );
        handler = module.get<AuditingCreateHttpCommunicationHandler>(
            AuditingCreateHttpCommunicationHandler,
        );
    });

    test('AuditingCreateHttpCommunicationResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('AuditingCreateHttpCommunicationResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an httpCommunication created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockHttpCommunicationData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <AuditingCreateHttpCommunicationInput>(
                        auditingMockHttpCommunicationData[0]
                    ),
                ),
            ).toBe(auditingMockHttpCommunicationData[0]);
        });
    });
});
