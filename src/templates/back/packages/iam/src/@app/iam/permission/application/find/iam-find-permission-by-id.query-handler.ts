/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import {
  IamFindPermissionByIdQuery,
  IamPermissionMapper,
  IamPermissionResponse,
} from '@app/iam/permission';
import { IamFindPermissionByIdService } from '@app/iam/permission/application/find/iam-find-permission-by-id.service';
import { IamPermissionId } from '@app/iam/permission/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindPermissionByIdQuery)
export class IamFindPermissionByIdQueryHandler
  implements IQueryHandler<IamFindPermissionByIdQuery>
{
  private readonly mapper: IamPermissionMapper = new IamPermissionMapper();

  constructor(
    private readonly findPermissionByIdService: IamFindPermissionByIdService,
  ) {}

  async execute(
    query: IamFindPermissionByIdQuery,
  ): Promise<IamPermissionResponse> {
    const permission = await this.findPermissionByIdService.main(
      new IamPermissionId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(permission);
  }
}
