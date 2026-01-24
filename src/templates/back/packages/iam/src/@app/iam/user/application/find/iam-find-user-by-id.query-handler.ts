import {
  IamFindUserByIdQuery,
  IamUserMapper,
  IamUserResponse,
} from '@app/iam/user';
import { IamFindUserByIdService } from '@app/iam/user/application/find/iam-find-user-by-id.service';
import { IamUserId } from '@app/iam/user/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindUserByIdQuery)
export class IamFindUserByIdQueryHandler
  implements IQueryHandler<IamFindUserByIdQuery>
{
  private readonly mapper: IamUserMapper = new IamUserMapper();

  constructor(private readonly findUserByIdService: IamFindUserByIdService) {}

  async execute(query: IamFindUserByIdQuery): Promise<IamUserResponse> {
    const user = await this.findUserByIdService.main(
      new IamUserId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(user);
  }
}
