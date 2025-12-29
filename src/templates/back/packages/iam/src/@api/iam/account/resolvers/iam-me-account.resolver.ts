import { IamAccount } from '@api/graphql';
import { Auth, GqlHeaders } from '@aurora/decorators';
import { Query, Resolver } from '@nestjs/graphql';
import { IamMeAccountHandler } from '../handlers/iam-me-account.handler';

@Resolver()
@Auth()
export class IamMeAccountResolver {
    constructor(private readonly handler: IamMeAccountHandler) {}

    @Query('iamMeAccount')
    async main(@GqlHeaders() headers: any): Promise<IamAccount> {
        return await this.handler.main(headers.authorization);
    }
}
