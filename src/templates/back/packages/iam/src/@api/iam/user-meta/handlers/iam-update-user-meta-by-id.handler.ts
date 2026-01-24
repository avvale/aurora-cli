import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

// @app
import { IamUpdateUserMetaByIdInput, IamUserMeta } from '@api/graphql';
import { IamAccountResponse } from '@app/iam/account';
import { IamFindUserByIdQuery, IamUpdateUserByIdCommand } from '@app/iam/user';
import { IamUpdateUserMetaByIdDto, IamUserMetaDto } from '../dto';

@Injectable()
export class IamUpdateUserMetaByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: IamUpdateUserMetaByIdInput | IamUpdateUserMetaByIdDto,
    account: IamAccountResponse,
    timezone?: string,
  ): Promise<IamUserMeta | IamUserMetaDto> {
    await this.commandBus.dispatch(
      new IamUpdateUserByIdCommand(
        {
          ...payload,
          id: account.user.id,
        },
        {},
        { timezone },
      ),
    );

    return await this.queryBus.ask(
      new IamFindUserByIdQuery(
        account.user.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
