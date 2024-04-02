/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTagByIdInput } from '@api/graphql';
import { IamUpsertTagHandler, IamUpsertTagResolver } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertTagResolver', () =>
{
    let resolver: IamUpsertTagResolver;
    let handler: IamUpsertTagHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertTagResolver,
                {
                    provide : IamUpsertTagHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpsertTagResolver>(IamUpsertTagResolver);
        handler = module.get<IamUpsertTagHandler>(IamUpsertTagHandler);
    });

    test('IamUpsertTagResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpsertTagResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tag upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTagData[0])));
            expect(await resolver.main(<IamUpdateTagByIdInput>iamMockTagData[0])).toBe(iamMockTagData[0]);
        });
    });
});
