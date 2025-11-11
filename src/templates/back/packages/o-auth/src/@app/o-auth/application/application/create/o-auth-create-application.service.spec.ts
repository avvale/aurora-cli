/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthIApplicationRepository,
    oAuthMockApplicationData,
    OAuthMockApplicationRepository,
} from '@app/o-auth/application';
import { OAuthCreateApplicationService } from '@app/o-auth/application/application/create/o-auth-create-application.service';
import {
    OAuthApplicationClientIds,
    OAuthApplicationCode,
    OAuthApplicationId,
    OAuthApplicationIsMaster,
    OAuthApplicationName,
    OAuthApplicationRowId,
    OAuthApplicationSecret,
} from '@app/o-auth/application/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationService', () => {
    let service: OAuthCreateApplicationService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthCreateApplicationService,
                OAuthMockApplicationRepository,
                {
                    provide: OAuthIApplicationRepository,
                    useValue: {
                        create: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthCreateApplicationService);
    });

    describe('main', () => {
        test('OAuthCreateApplicationService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create a application and emit event', async () => {
            expect(
                await service.main({
                    id: new OAuthApplicationId(oAuthMockApplicationData[0].id),
                    rowId: new OAuthApplicationRowId(
                        oAuthMockApplicationData[0].rowId,
                    ),
                    code: new OAuthApplicationCode(
                        oAuthMockApplicationData[0].code,
                    ),
                    name: new OAuthApplicationName(
                        oAuthMockApplicationData[0].name,
                    ),
                    secret: new OAuthApplicationSecret(
                        oAuthMockApplicationData[0].secret,
                    ),
                    isMaster: new OAuthApplicationIsMaster(
                        oAuthMockApplicationData[0].isMaster,
                    ),
                    clientIds: new OAuthApplicationClientIds(
                        oAuthMockApplicationData[0].clientIds,
                    ),
                }),
            ).toBe(undefined);
        });
    });
});
