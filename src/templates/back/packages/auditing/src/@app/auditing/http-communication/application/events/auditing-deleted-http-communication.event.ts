import { CQMetadata } from '@aurorajs.dev/core';

export class AuditingDeletedHttpCommunicationEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        rowId: number;
        tags: string[];
        event: string;
        status: number;
        method: string;
        url: string;
        httpRequest: any;
        httpRequestRejected: any;
        httpResponse: any;
        httpResponseRejected: any;
        isReprocessing: boolean;
        reprocessingHttpCommunicationId: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
