/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';
import { UpdateSideEffectsService } from './update-side-effects.service';
import {
    SideEffectId,
    SideEffectTags,
    SideEffectModelPath,
    SideEffectModelName,
    SideEffectOperationId,
    SideEffectOperationSort,
    SideEffectAccountId,
    SideEffectEmail,
    SideEffectEvent,
    SideEffectAuditableId,
    SideEffectOldValue,
    SideEffectNewValue,
    SideEffectIp,
    SideEffectMethod,
    SideEffectBaseUrl,
    SideEffectParams,
    SideEffectQuery,
    SideEffectBody,
    SideEffectUserAgent,
    SideEffectIsRollback,
    SideEffectRollbackSideEffectId,
    SideEffectCreatedAt,
    SideEffectUpdatedAt,
    SideEffectDeletedAt,
} from '../../domain/value-objects';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { MockSideEffectRepository } from '../../infrastructure/mock/mock-side-effect.repository';

describe('UpdateSideEffectsService', () =>
{
    let service: UpdateSideEffectsService;
    let repository: ISideEffectRepository;
    let mockRepository: MockSideEffectRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateSideEffectsService,
                MockSideEffectRepository,
                {
                    provide : ISideEffectRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpdateSideEffectsService);
        repository      = module.get(ISideEffectRepository);
        mockRepository  = module.get(MockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('UpdateSideEffectsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a sideEffects and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new SideEffectId(sideEffects[0].id),
                    tags: new SideEffectTags(sideEffects[0].tags),
                    modelPath: new SideEffectModelPath(sideEffects[0].modelPath),
                    modelName: new SideEffectModelName(sideEffects[0].modelName),
                    operationId: new SideEffectOperationId(sideEffects[0].operationId),
                    operationSort: new SideEffectOperationSort(sideEffects[0].operationSort),
                    accountId: new SideEffectAccountId(sideEffects[0].accountId),
                    email: new SideEffectEmail(sideEffects[0].email),
                    event: new SideEffectEvent(sideEffects[0].event),
                    auditableId: new SideEffectAuditableId(sideEffects[0].auditableId),
                    oldValue: new SideEffectOldValue(sideEffects[0].oldValue),
                    newValue: new SideEffectNewValue(sideEffects[0].newValue),
                    ip: new SideEffectIp(sideEffects[0].ip),
                    method: new SideEffectMethod(sideEffects[0].method),
                    baseUrl: new SideEffectBaseUrl(sideEffects[0].baseUrl),
                    params: new SideEffectParams(sideEffects[0].params),
                    query: new SideEffectQuery(sideEffects[0].query),
                    body: new SideEffectBody(sideEffects[0].body),
                    userAgent: new SideEffectUserAgent(sideEffects[0].userAgent),
                    isRollback: new SideEffectIsRollback(sideEffects[0].isRollback),
                    rollbackSideEffectId: new SideEffectRollbackSideEffectId(sideEffects[0].rollbackSideEffectId),
                },
            )).toBe(undefined);
        });
    });
});