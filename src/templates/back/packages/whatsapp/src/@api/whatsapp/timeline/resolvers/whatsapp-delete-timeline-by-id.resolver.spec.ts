/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappDeleteTimelineByIdHandler,
  WhatsappDeleteTimelineByIdResolver,
} from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteTimelineByIdResolver', () => {
  let resolver: WhatsappDeleteTimelineByIdResolver;
  let handler: WhatsappDeleteTimelineByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappDeleteTimelineByIdResolver,
        {
          provide: WhatsappDeleteTimelineByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<WhatsappDeleteTimelineByIdResolver>(
      WhatsappDeleteTimelineByIdResolver,
    );
    handler = module.get<WhatsappDeleteTimelineByIdHandler>(
      WhatsappDeleteTimelineByIdHandler,
    );
  });

  test('WhatsappDeleteTimelineByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappDeleteTimelineByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an timeline deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockTimelineData[0])),
        );
      expect(await resolver.main(whatsappMockTimelineData[0].id)).toBe(
        whatsappMockTimelineData[0],
      );
    });
  });
});
