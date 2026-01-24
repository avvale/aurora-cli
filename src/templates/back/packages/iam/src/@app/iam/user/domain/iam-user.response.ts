import { IamAccountResponse } from '@app/iam/account';

export class IamUserResponse {
  constructor(
    public readonly id: string,
    public readonly rowId: number,
    public readonly accountId: string,
    public readonly name: string,
    public readonly surname: string,
    public readonly avatar: string,
    public readonly mobile: string,
    public readonly langId: string,
    public readonly password: string,
    public readonly isTwoFactorAuthenticationEnabled: boolean,
    public readonly twoFactorAuthenticationSecret: string,
    public readonly rememberToken: string,
    public readonly meta: any,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly deletedAt: string,
    public readonly account: IamAccountResponse,
  ) {}
}
