/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateTimelineByIdInput } from '@api/graphql';
import {
  WhatsappUpdateTimelineByIdHandler,
  WhatsappUpdateTimelineByIdResolver,
} from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateTimelineByIdResolver', () => {
  let resolver: WhatsappUpdateTimelineByIdResolver;
  let handler: WhatsappUpdateTimelineByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappUpdateTimelineByIdResolver,
        {
          provide: WhatsappUpdateTimelineByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<WhatsappUpdateTimelineByIdResolver>(
      WhatsappUpdateTimelineByIdResolver,
    );
    handler = module.get<WhatsappUpdateTimelineByIdHandler>(
      WhatsappUpdateTimelineByIdHandler,
    );
  });

  test('WhatsappUpdateTimelineByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappUpdateTimelineByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a timeline by id updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockTimelineData[0])),
        );
      expect(
        await resolver.main(
          <WhatsappUpdateTimelineByIdInput>whatsappMockTimelineData[0],
        ),
      ).toBe(whatsappMockTimelineData[0]);
    });
  });
});
