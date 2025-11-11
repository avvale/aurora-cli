/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTagByIdInput } from '@api/graphql';
import {
    IamUpdateTagByIdHandler,
    IamUpdateTagByIdResolver,
} from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTagByIdResolver', () => {
    let resolver: IamUpdateTagByIdResolver;
    let handler: IamUpdateTagByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdateTagByIdResolver,
                {
                    provide: IamUpdateTagByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdateTagByIdResolver>(
            IamUpdateTagByIdResolver,
        );
        handler = module.get<IamUpdateTagByIdHandler>(IamUpdateTagByIdHandler);
    });

    test('IamUpdateTagByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdateTagByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a tag by id updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTagData[0])),
            );
            expect(
                await resolver.main(<IamUpdateTagByIdInput>iamMockTagData[0]),
            ).toBe(iamMockTagData[0]);
        });
    });
});
