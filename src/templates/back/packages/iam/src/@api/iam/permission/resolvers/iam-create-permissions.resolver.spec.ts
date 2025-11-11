import { IamCreatePermissionInput } from '@api/graphql';
import {
    IamCreatePermissionsHandler,
    IamCreatePermissionsResolver,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionsResolver', () => {
    let resolver: IamCreatePermissionsResolver;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreatePermissionsResolver,
                {
                    provide: IamCreatePermissionsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreatePermissionsResolver>(
            IamCreatePermissionsResolver,
        );
    });

    test('IamCreatePermissionsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamCreatePermissionsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an permissions created', async () => {
            expect(
                await resolver.main(
                    <IamCreatePermissionInput[]>iamMockPermissionData,
                ),
            ).toBe(undefined);
        });
    });
});
