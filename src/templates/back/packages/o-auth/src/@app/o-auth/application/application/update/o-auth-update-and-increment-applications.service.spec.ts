/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIApplicationRepository, oAuthMockApplicationData, OAuthMockApplicationRepository } from '@app/o-auth/application';
import { OAuthUpdateAndIncrementApplicationsService } from '@app/o-auth/application/application/update/o-auth-update-and-increment-applications.service';
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

describe('OAuthUpdateAndIncrementApplicationsService', () =>
{
    let service: OAuthUpdateAndIncrementApplicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthUpdateAndIncrementApplicationsService,
                OAuthMockApplicationRepository,
                {
                    provide : OAuthIApplicationRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthUpdateAndIncrementApplicationsService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementApplicationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a applications and emit event', async () =>
        {
            /* eslint-disable key-spacing */
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
                    {},
                ),
            )
                .toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
