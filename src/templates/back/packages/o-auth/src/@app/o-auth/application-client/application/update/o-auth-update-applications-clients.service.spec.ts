/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIApplicationClientRepository, oAuthMockApplicationClientData, OAuthMockApplicationClientRepository } from '@app/o-auth/application-client';
import { OAuthUpdateApplicationsClientsService } from '@app/o-auth/application-client/application/update/o-auth-update-applications-clients.service';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationsClientsService', () =>
{
    let service: OAuthUpdateApplicationsClientsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthUpdateApplicationsClientsService,
                OAuthMockApplicationClientRepository,
                {
                    provide : OAuthIApplicationClientRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthUpdateApplicationsClientsService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationsClientsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a applicationsClients and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        applicationId: new OAuthApplicationClientApplicationId(oAuthMockApplicationClientData[0].applicationId),
                        clientId: new OAuthApplicationClientClientId(oAuthMockApplicationClientData[0].clientId),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
