import {
  ToolsFindWebhookByIdQuery,
  ToolsWebhookMapper,
  ToolsWebhookResponse,
} from '@app/tools/webhook';
import { ToolsFindWebhookByIdService } from '@app/tools/webhook/application/find/tools-find-webhook-by-id.service';
import { ToolsWebhookId } from '@app/tools/webhook/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsFindWebhookByIdQuery)
export class ToolsFindWebhookByIdQueryHandler
  implements IQueryHandler<ToolsFindWebhookByIdQuery>
{
  private readonly mapper: ToolsWebhookMapper = new ToolsWebhookMapper();

  constructor(
    private readonly findWebhookByIdService: ToolsFindWebhookByIdService,
  ) {}

  async execute(
    query: ToolsFindWebhookByIdQuery,
  ): Promise<ToolsWebhookResponse> {
    const webhook = await this.findWebhookByIdService.main(
      new ToolsWebhookId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(webhook);
  }
}
