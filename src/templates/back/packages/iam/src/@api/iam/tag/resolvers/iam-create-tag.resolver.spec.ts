/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateTagInput } from '@api/graphql';
import { IamCreateTagHandler, IamCreateTagResolver } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTagResolver', () => {
  let resolver: IamCreateTagResolver;
  let handler: IamCreateTagHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamCreateTagResolver,
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

    resolver = module.get<IamCreateTagResolver>(IamCreateTagResolver);
    handler = module.get<IamCreateTagHandler>(IamCreateTagHandler);
  });

  test('IamCreateTagResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamCreateTagResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an tag created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTagData[0])),
        );
      expect(await resolver.main(<IamCreateTagInput>iamMockTagData[0])).toBe(
        iamMockTagData[0],
      );
    });
  });
});
