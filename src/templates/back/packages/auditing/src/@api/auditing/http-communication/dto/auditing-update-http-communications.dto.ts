/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { AuditingHttpCommunicationEvent } from '@api/graphql';

export class AuditingUpdateHttpCommunicationsDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : Object,
        description: 'tags [input here api field description]',
    })
    tags?: any;

    @ApiProperty({
        type       : AuditingHttpCommunicationEvent,
        enum       : ['REQUEST_FULFILLED','REQUEST_REJECTED','RESPONSE_FULFILLED','RESPONSE_REJECTED'],
        description: 'event [input here api field description]',
        example    : AuditingHttpCommunicationEvent.REQUEST_FULFILLED,
    })
    event?: AuditingHttpCommunicationEvent;

    @ApiProperty({
        type       : Number,
        description: 'status [input here api field description]',
    })
    status?: number;

    @ApiProperty({
        type       : String,
        description: 'method [input here api field description]',
    })
    method?: string;

    @ApiProperty({
        type       : String,
        description: 'url [input here api field description]',
    })
    url?: string;

    @ApiProperty({
        type       : Object,
        description: 'httpRequest [input here api field description]',
    })
    httpRequest?: any;

    @ApiProperty({
        type       : Object,
        description: 'httpRequestRejected [input here api field description]',
    })
    httpRequestRejected?: any;

    @ApiProperty({
        type       : Object,
        description: 'httpResponse [input here api field description]',
    })
    httpResponse?: any;

    @ApiProperty({
        type       : Object,
        description: 'httpResponseRejected [input here api field description]',
    })
    httpResponseRejected?: any;

    @ApiProperty({
        type       : Boolean,
        description: 'isReprocessing [input here api field description]',
        example    : true,
    })
    isReprocessing?: boolean;

    @ApiProperty({
        type       : String,
        description: 'reprocessingHttpCommunicationId [input here api field description]',
    })
    reprocessingHttpCommunicationId?: string;

}