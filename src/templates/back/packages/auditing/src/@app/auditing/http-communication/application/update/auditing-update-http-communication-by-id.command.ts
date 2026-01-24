import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class AuditingUpdateHttpCommunicationByIdCommand {
  constructor(
    public readonly payload: {
      id: string;
      tags?: string[];
      event?: string;
      status?: number;
      method?: string;
      url?: string;
      httpRequest?: any;
      httpRequestRejected?: any;
      httpResponse?: any;
      httpResponseRejected?: any;
      isReprocessing?: boolean;
      reprocessingHttpCommunicationId?: string;
    },
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
