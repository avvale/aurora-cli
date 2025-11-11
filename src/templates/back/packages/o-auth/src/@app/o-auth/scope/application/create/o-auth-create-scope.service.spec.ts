/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthIScopeRepository,
    oAuthMockScopeData,
    OAuthMockScopeRepository,
} from '@app/o-auth/scope';
import { OAuthCreateScopeService } from '@app/o-auth/scope/application/create/o-auth-create-scope.service';
import {
    OAuthScopeCode,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeRoleIds,
    OAuthScopeRowId,
} from '@app/o-auth/scope/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateScopeService', () => {
    let service: OAuthCreateScopeService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthCreateScopeService,
                OAuthMockScopeRepository,
                {
                    provide: OAuthIScopeRepository,
                    useValue: {
                        create: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthCreateScopeService);
    });

    describe('main', () => {
        test('OAuthCreateScopeService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create a scope and emit event', async () => {
            expect(
                await service.main({
                    id: new OAuthScopeId(oAuthMockScopeData[0].id),
                    rowId: new OAuthScopeRowId(oAuthMockScopeData[0].rowId),
                    code: new OAuthScopeCode(oAuthMockScopeData[0].code),
                    name: new OAuthScopeName(oAuthMockScopeData[0].name),
                    roleIds: new OAuthScopeRoleIds(
                        oAuthMockScopeData[0].roleIds,
                    ),
                }),
            ).toBe(undefined);
        });
    });
});
