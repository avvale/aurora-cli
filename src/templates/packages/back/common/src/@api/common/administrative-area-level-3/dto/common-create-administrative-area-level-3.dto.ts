/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class CommonCreateAdministrativeAreaLevel3Dto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'countryId [input here api field description]',
        example    : '6f3c3541-9f9a-4be9-aba8-2b0217c5a681',
    })
    countryId: string;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel1Id [input here api field description]',
        example    : '7eb32fa8-329c-4a2c-82df-e0c744192474',
    })
    administrativeAreaLevel1Id: string;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel2Id [input here api field description]',
        example    : '6aad0325-6a0a-4be4-b505-9034d074771f',
    })
    administrativeAreaLevel2Id: string;

    @ApiProperty({
        type       : String,
        description: 'code [input here api field description]',
    })
    code: string;

    @ApiProperty({
        type       : String,
        description: 'customCode [input here api field description]',
    })
    customCode?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type       : String,
        description: 'slug [input here api field description]',
    })
    slug: string;

    @ApiProperty({
        type       : Number,
        description: 'latitude [input here api field description]',
    })
    latitude?: number;

    @ApiProperty({
        type       : Number,
        description: 'longitude [input here api field description]',
    })
    longitude?: number;

    @ApiProperty({
        type       : Number,
        description: 'zoom [input here api field description]',
    })
    zoom?: number;

}