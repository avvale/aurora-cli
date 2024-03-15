/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappIMessageRepository, whatsappMockMessageData, WhatsappMockMessageRepository } from '@app/whatsapp/message';
import { WhatsappDeleteMessageByIdService } from '@app/whatsapp/message/application/delete/whatsapp-delete-message-by-id.service';
import { WhatsappMessageId } from '@app/whatsapp/message/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteMessageByIdService', () =>
{
    let service: WhatsappDeleteMessageByIdService;
    let repository: WhatsappIMessageRepository;
    let mockRepository: WhatsappMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappDeleteMessageByIdService,
                WhatsappMockMessageRepository,
                {
                    provide : WhatsappIMessageRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappDeleteMessageByIdService);
        repository = module.get(WhatsappIMessageRepository);
        mockRepository = module.get(WhatsappMockMessageRepository);
    });

    describe('main', () =>
    {
        test('WhatsappDeleteMessageByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete message and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new WhatsappMessageId(whatsappMockMessageData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
