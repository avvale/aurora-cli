import {
    IamIRoleAccountRepository,
    IamRoleAccount,
} from '@app/iam/role-account';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindRoleAccountService {
    constructor(private readonly repository: IamIRoleAccountRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamRoleAccount> {
        return await this.repository.find({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
