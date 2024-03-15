/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappIConversationRepository, whatsappMockConversationData, WhatsappMockConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappDeleteConversationByIdService } from '@app/whatsapp/conversation/application/delete/whatsapp-delete-conversation-by-id.service';
import { WhatsappConversationId } from '@app/whatsapp/conversation/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteConversationByIdService', () =>
{
    let service: WhatsappDeleteConversationByIdService;
    let repository: WhatsappIConversationRepository;
    let mockRepository: WhatsappMockConversationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappDeleteConversationByIdService,
                WhatsappMockConversationRepository,
                {
                    provide : WhatsappIConversationRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappDeleteConversationByIdService);
        repository = module.get(WhatsappIConversationRepository);
        mockRepository = module.get(WhatsappMockConversationRepository);
    });

    describe('main', () =>
    {
        test('WhatsappDeleteConversationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete conversation and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new WhatsappConversationId(whatsappMockConversationData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
