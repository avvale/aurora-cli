/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { applications } from '@app/o-auth/application/infrastructure/mock/mock-application.data';
import { UpsertApplicationService } from './upsert-application.service';
import {
    ApplicationId,
    ApplicationCode,
    ApplicationName,
    ApplicationSecret,
    ApplicationIsMaster,
    ApplicationClientIds,
    ApplicationCreatedAt,
    ApplicationUpdatedAt,
    ApplicationDeletedAt,
} from '../../domain/value-objects';
import { IApplicationRepository } from '../../domain/application.repository';
import { MockApplicationRepository } from '../../infrastructure/mock/mock-application.repository';

describe('UpsertApplicationService', () =>

{
    let service: UpsertApplicationService;
    let repository: IApplicationRepository;
    let mockRepository: MockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpsertApplicationService,
                MockApplicationRepository,
                {
                    provide : IApplicationRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpsertApplicationService);
        repository      = module.get(IApplicationRepository);
        mockRepository  = module.get(MockApplicationRepository);
    });

    describe('main', () =>
    {
        test('UpsertApplicationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a application and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new ApplicationId(applications[0].id),
                    code: new ApplicationCode(applications[0].code),
                    name: new ApplicationName(applications[0].name),
                    secret: new ApplicationSecret(applications[0].secret),
                    isMaster: new ApplicationIsMaster(applications[0].isMaster),
                    clientIds: new ApplicationClientIds(applications[0].clientIds),
                },
            )).toBe(undefined);
        });
    });
});