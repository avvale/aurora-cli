import { IamFindTagByIdController, IamFindTagByIdHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTagByIdController', () => {
  let controller: IamFindTagByIdController;
  let handler: IamFindTagByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamFindTagByIdController],
      providers: [
        {
          provide: IamFindTagByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamFindTagByIdController>(IamFindTagByIdController);
    handler = module.get<IamFindTagByIdHandler>(IamFindTagByIdHandler);
  });

  describe('main', () => {
    test('IamFindTagByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an tag by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTagData[0])),
        );
      expect(await controller.main(iamMockTagData[0].id)).toBe(
        iamMockTagData[0],
      );
    });
  });
});
