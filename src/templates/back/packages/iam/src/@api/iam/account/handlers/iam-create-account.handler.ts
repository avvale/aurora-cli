import { IamAccount, IamCreateAccountInput } from '@api/graphql';
import { createAccount, IamAccountDto, IamCreateAccountDto } from '@api/iam/account';
import { AuditingMeta, ICommandBus, IQueryBus, LiteralObject } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IamCreateAccountHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly jwtService: JwtService,
    ) {}

    async main(
        payload: IamCreateAccountInput | IamCreateAccountDto,
        headers: LiteralObject,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamAccount | IamAccountDto>
    {
        return createAccount(
            this.commandBus,
            this.queryBus,
            this.jwtService,
            payload,
            headers,
            timezone,
            auditing,
        );
    }
}
