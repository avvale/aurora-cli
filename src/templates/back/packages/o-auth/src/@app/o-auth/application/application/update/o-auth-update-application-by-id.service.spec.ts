/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIApplicationRepository, oAuthMockApplicationData, OAuthMockApplicationRepository } from '@app/o-auth/application';
import { OAuthUpdateApplicationByIdService } from '@app/o-auth/application/application/update/o-auth-update-application-by-id.service';
import {
    OAuthApplicationClientIds,
    OAuthApplicationCode,
    OAuthApplicationId,
    OAuthApplicationIsMaster,
    OAuthApplicationName,
    OAuthApplicationSecret,
} from '@app/o-auth/application/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationByIdService', () =>
{
    let service: OAuthUpdateApplicationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthUpdateApplicationByIdService,
                OAuthMockApplicationRepository,
                {
                    provide : OAuthIApplicationRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthUpdateApplicationByIdService);
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a application and emit event', async () =>
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
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
