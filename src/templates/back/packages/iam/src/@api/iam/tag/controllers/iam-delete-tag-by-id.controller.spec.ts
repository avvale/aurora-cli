/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamDeleteTagByIdController,
  IamDeleteTagByIdHandler,
} from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTagByIdController', () => {
  let controller: IamDeleteTagByIdController;
  let handler: IamDeleteTagByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamDeleteTagByIdController],
      providers: [
        {
          provide: IamDeleteTagByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamDeleteTagByIdController>(
      IamDeleteTagByIdController,
    );
    handler = module.get<IamDeleteTagByIdHandler>(IamDeleteTagByIdHandler);
  });

  describe('main', () => {
    test('IamDeleteTagByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an tag deleted', async () => {
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
