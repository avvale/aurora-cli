/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { AuditingSideEffectEvent, AuditingSideEffectMethod } from '@api/graphql';

export class AuditingCreateSideEffectDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'modelPath [input here api field description]',
    })
    modelPath: string;

    @ApiProperty({
        type       : String,
        description: 'modelName [input here api field description]',
    })
    modelName: string;

    @ApiProperty({
        type       : String,
        description: 'operationId [input here api field description]',
    })
    operationId?: string;

    @ApiProperty({
        type       : Number,
        description: 'operationSort [input here api field description]',
    })
    operationSort?: number;

    @ApiProperty({
        type       : String,
        description: 'accountId [input here api field description]',
    })
    accountId: string;

    @ApiProperty({
        type       : String,
        description: 'email [input here api field description]',
        example    : 'john@gmail.com',
    })
    email: string;

    @ApiProperty({
        type       : AuditingSideEffectEvent,
        enum       : ['CREATED','BULK_CREATED','UPDATED','BULK_UPDATED','DELETED','BULK_DELETED','RESTORED','BULK_RESTORED','UPSERTED'],
        description: 'event [input here api field description]',
        example    : AuditingSideEffectEvent.CREATED,
    })
    event: AuditingSideEffectEvent;

    @ApiProperty({
        type       : String,
        description: 'auditableId [input here api field description]',
    })
    auditableId?: string;

    @ApiProperty({
        type       : Object,
        description: 'oldValue [input here api field description]',
    })
    oldValue?: any;

    @ApiProperty({
        type       : Object,
        description: 'newValue [input here api field description]',
    })
    newValue?: any;

    @ApiProperty({
        type       : String,
        description: 'ip [input here api field description]',
    })
    ip?: string;

    @ApiProperty({
        type       : AuditingSideEffectMethod,
        enum       : ['GET','POST','UPDATE','DELETE'],
        description: 'method [input here api field description]',
        example    : AuditingSideEffectMethod.POST,
    })
    method: AuditingSideEffectMethod;

    @ApiProperty({
        type       : String,
        description: 'baseUrl [input here api field description]',
    })
    baseUrl?: string;

    @ApiProperty({
        type       : Object,
        description: 'params [input here api field description]',
    })
    params?: any;

    @ApiProperty({
        type       : Object,
        description: 'query [input here api field description]',
    })
    query?: any;

    @ApiProperty({
        type       : Object,
        description: 'body [input here api field description]',
    })
    body?: any;

    @ApiProperty({
        type       : String,
        description: 'userAgent [input here api field description]',
    })
    userAgent?: string;

    @ApiProperty({
        type       : Object,
        description: 'tags [input here api field description]',
    })
    tags?: any;

    @ApiProperty({
        type       : Boolean,
        description: 'isRollback [input here api field description]',
        example    : true,
    })
    isRollback: boolean;

    @ApiProperty({
        type       : String,
        description: 'rollbackSideEffectId [input here api field description]',
    })
    rollbackSideEffectId?: string;

}