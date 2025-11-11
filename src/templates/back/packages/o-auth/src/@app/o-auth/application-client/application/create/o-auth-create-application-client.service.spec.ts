/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthIApplicationClientRepository,
    oAuthMockApplicationClientData,
    OAuthMockApplicationClientRepository,
} from '@app/o-auth/application-client';
import { OAuthCreateApplicationClientService } from '@app/o-auth/application-client/application/create/o-auth-create-application-client.service';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationClientService', () => {
    let service: OAuthCreateApplicationClientService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthCreateApplicationClientService,
                OAuthMockApplicationClientRepository,
                {
                    provide: OAuthIApplicationClientRepository,
                    useValue: {
                        create: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthCreateApplicationClientService);
    });

    describe('main', () => {
        test('OAuthCreateApplicationClientService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create a applicationClient and emit event', async () => {
            expect(
                await service.main({
                    applicationId: new OAuthApplicationClientApplicationId(
                        oAuthMockApplicationClientData[0].applicationId,
                    ),
                    clientId: new OAuthApplicationClientClientId(
                        oAuthMockApplicationClientData[0].clientId,
                    ),
                }),
            ).toBe(undefined);
        });
    });
});
