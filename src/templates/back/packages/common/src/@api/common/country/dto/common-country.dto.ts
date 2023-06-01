/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { CommonCountryDto } from '../../../common/country/dto/common-country.dto';
import { CommonLangDto } from '../../../common/lang/dto/common-lang.dto';

export class CommonCountryDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'iso3166Alpha2 [input here api field description]',
    })
    iso3166Alpha2: string;

    @ApiProperty({
        type       : String,
        description: 'iso3166Alpha3 [input here api field description]',
    })
    iso3166Alpha3: string;

    @ApiProperty({
        type       : String,
        description: 'iso3166Numeric [input here api field description]',
    })
    iso3166Numeric: string;

    @ApiProperty({
        type       : String,
        description: 'customCode [input here api field description]',
    })
    customCode?: string;

    @ApiProperty({
        type       : String,
        description: 'prefix [input here api field description]',
    })
    prefix?: string;

    @ApiProperty({
        type       : String,
        description: 'image [input here api field description]',
    })
    image?: string;

    @ApiProperty({
        type       : Number,
        description: 'sort [input here api field description]',
    })
    sort?: number;

    @ApiProperty({
        type       : Object,
        description: 'administrativeAreas [input here api field description]',
    })
    administrativeAreas?: any;

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

    @ApiProperty({
        type       : Object,
        description: 'availableLangs [input here api field description]',
    })
    availableLangs?: any;

    @ApiProperty({
        type       : String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type       : String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type       : String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;

    @ApiProperty({
        type       : String,
        description: 'langId [input here api field description]',
        example    : 'd29dec42-081f-436d-a8be-d4d8a21abae8',
    })
    langId: string;

    @ApiProperty({
        type       : () => CommonLangDto,
        description: 'CommonLang [input here api field description]',
    })
    lang?: CommonLangDto;

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
        type       : String,
        description: 'administrativeAreaLevel1 [input here api field description]',
    })
    administrativeAreaLevel1?: string;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel2 [input here api field description]',
    })
    administrativeAreaLevel2?: string;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel3 [input here api field description]',
    })
    administrativeAreaLevel3?: string;

}