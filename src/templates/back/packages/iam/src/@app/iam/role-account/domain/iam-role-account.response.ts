import { IamAccountResponse } from '@app/iam/account';
import { IamRoleResponse } from '@app/iam/role';

export class IamRoleAccountResponse {
  constructor(
    public readonly roleId: string,
    public readonly accountId: string,
    public readonly role: IamRoleResponse,
    public readonly account: IamAccountResponse,
  ) {}
}
