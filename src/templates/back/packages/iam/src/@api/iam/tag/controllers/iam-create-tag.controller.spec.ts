import { IamCreateTagController, IamCreateTagHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTagController', () => {
  let controller: IamCreateTagController;
  let handler: IamCreateTagHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamCreateTagController],
      providers: [
        {
          provide: IamCreateTagHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamCreateTagController>(IamCreateTagController);
    handler = module.get<IamCreateTagHandler>(IamCreateTagHandler);
  });

  describe('main', () => {
    test('IamCreateTagController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an tag created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTagData[0])),
        );
      expect(await controller.main(iamMockTagData[0])).toBe(iamMockTagData[0]);
    });
  });
});
