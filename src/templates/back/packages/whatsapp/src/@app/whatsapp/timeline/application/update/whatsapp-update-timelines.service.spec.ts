/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappITimelineRepository, whatsappMockTimelineData, WhatsappMockTimelineRepository } from '@app/whatsapp/timeline';
import { WhatsappUpdateTimelinesService } from '@app/whatsapp/timeline/application/update/whatsapp-update-timelines.service';
import {
    WhatsappTimelineAccounts,
    WhatsappTimelineId,
    WhatsappTimelineWabaContactId,
    WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateTimelinesService', () =>
{
    let service: WhatsappUpdateTimelinesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappUpdateTimelinesService,
                WhatsappMockTimelineRepository,
                {
                    provide : WhatsappITimelineRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappUpdateTimelinesService);
    });

    describe('main', () =>
    {
        test('UpdateTimelinesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a timelines and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new WhatsappTimelineId(whatsappMockTimelineData[0].id),
                        accounts: new WhatsappTimelineAccounts(whatsappMockTimelineData[0].accounts),
                        wabaPhoneNumberId: new WhatsappTimelineWabaPhoneNumberId(whatsappMockTimelineData[0].wabaPhoneNumberId),
                        wabaContactId: new WhatsappTimelineWabaContactId(whatsappMockTimelineData[0].wabaContactId),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
