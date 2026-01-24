import { IamAccount, IamCreateAccountInput } from '@api/graphql';
import {
  createAccount,
  IamAccountDto,
  IamCreateAccountDto,
} from '@api/iam/account';
import { IamAccountResponse } from '@app/iam/account';
import { AuditingMeta, LiteralObject } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class IamCreateAccountHandler {
  constructor(private readonly moduleRef: ModuleRef) {}

  async main(
    account: IamAccountResponse,
    headers: LiteralObject,
    payload: IamCreateAccountInput | IamCreateAccountDto,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamAccount | IamAccountDto> {
    return createAccount({
      moduleRef: this.moduleRef,
      payload,
      account,
      headers,
      timezone,
      auditing,
    });
  }
}
