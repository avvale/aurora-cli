/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamDeleteTagByIdHandler,
  IamDeleteTagByIdResolver,
} from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTagByIdResolver', () => {
  let resolver: IamDeleteTagByIdResolver;
  let handler: IamDeleteTagByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteTagByIdResolver,
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

    resolver = module.get<IamDeleteTagByIdResolver>(IamDeleteTagByIdResolver);
    handler = module.get<IamDeleteTagByIdHandler>(IamDeleteTagByIdHandler);
  });

  test('IamDeleteTagByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamDeleteTagByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an tag deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTagData[0])),
        );
      expect(await resolver.main(iamMockTagData[0].id)).toBe(iamMockTagData[0]);
    });
  });
});
