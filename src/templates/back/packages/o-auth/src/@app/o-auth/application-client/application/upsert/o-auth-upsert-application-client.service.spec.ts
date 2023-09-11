/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIApplicationClientRepository, oAuthMockApplicationClientData, OAuthMockApplicationClientRepository } from '@app/o-auth/application-client';
import { OAuthUpsertApplicationClientService } from '@app/o-auth/application-client/application/upsert/o-auth-upsert-application-client.service';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertApplicationClientService', () =>

{
    let service: OAuthUpsertApplicationClientService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthUpsertApplicationClientService,
                OAuthMockApplicationClientRepository,
                {
                    provide : OAuthIApplicationClientRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthUpsertApplicationClientService);
    });

    describe('main', () =>
    {
        test('OAuthUpsertApplicationClientService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a applicationClient and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        applicationId: new OAuthApplicationClientApplicationId(oAuthMockApplicationClientData[0].applicationId),
                        clientId: new OAuthApplicationClientClientId(oAuthMockApplicationClientData[0].clientId),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
