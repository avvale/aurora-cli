/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockApplicationData } from '@app/o-auth/application/infrastructure/mock/o-auth-mock-application.data';
import { OAuthUpsertApplicationService } from './o-auth-upsert-application.service';
import {
    OAuthApplicationId,
    OAuthApplicationCode,
    OAuthApplicationName,
    OAuthApplicationSecret,
    OAuthApplicationIsMaster,
    OAuthApplicationClientIds,
    OAuthApplicationCreatedAt,
    OAuthApplicationUpdatedAt,
    OAuthApplicationDeletedAt,
} from '../../domain/value-objects';
import { OAuthIApplicationRepository } from '../../domain/o-auth-application.repository';
import { OAuthMockApplicationRepository } from '../../infrastructure/mock/o-auth-mock-application.repository';

describe('OAuthUpsertApplicationService', () =>

{
    let service: OAuthUpsertApplicationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthUpsertApplicationService,
                OAuthMockApplicationRepository,
                {
                    provide : OAuthIApplicationRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthUpsertApplicationService);
    });

    describe('main', () =>
    {
        test('OAuthUpsertApplicationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a application and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new OAuthApplicationId(oAuthMockApplicationData[0].id),
                        code: new OAuthApplicationCode(oAuthMockApplicationData[0].code),
                        name: new OAuthApplicationName(oAuthMockApplicationData[0].name),
                        secret: new OAuthApplicationSecret(oAuthMockApplicationData[0].secret),
                        isMaster: new OAuthApplicationIsMaster(oAuthMockApplicationData[0].isMaster),
                        clientIds: new OAuthApplicationClientIds(oAuthMockApplicationData[0].clientIds),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
