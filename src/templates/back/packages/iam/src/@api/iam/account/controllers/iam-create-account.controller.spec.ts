import {
  IamCreateAccountController,
  IamCreateAccountHandler,
} from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateAccountController', () => {
  let controller: IamCreateAccountController;
  let handler: IamCreateAccountHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamCreateAccountController],
      providers: [
        {
          provide: IamCreateAccountHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamCreateAccountController>(
      IamCreateAccountController,
    );
    handler = module.get<IamCreateAccountHandler>(IamCreateAccountHandler);
  });

  describe('main', () => {
    test('IamCreateAccountController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an account created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockAccountData[0])),
        );
      expect(await controller.main(iamMockAccountData[0])).toBe(
        iamMockAccountData[0],
      );
    });
  });
});
