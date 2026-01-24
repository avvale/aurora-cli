import { IamCountUserQuery } from '@app/iam/user';
import { IamCountUserService } from '@app/iam/user/application/count/iam-count-user.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamCountUserQuery)
export class IamCountUserQueryHandler
  implements IQueryHandler<IamCountUserQuery>
{
  constructor(private readonly countUserService: IamCountUserService) {}

  async execute(query: IamCountUserQuery): Promise<number> {
    return await this.countUserService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );
  }
}
