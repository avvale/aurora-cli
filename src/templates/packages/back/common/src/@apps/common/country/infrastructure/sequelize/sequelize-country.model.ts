/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CommonLangModel } from '../../../../../@apps/common/lang/infrastructure/sequelize/sequelize-lang.model';
import { CommonCountryI18NModel } from './sequelize-country-i18n.model';

@Table({ modelName: 'CommonCountry', freezeTableName: true, timestamps: false })
export class CommonCountryModel extends Model<CommonCountryModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Index
    @Column({
        field: 'iso3166Alpha2',
        allowNull: false,
        type: DataTypes.CHAR(2),
    })
    iso3166Alpha2: string;

    @Index
    @Column({
        field: 'iso3166Alpha3',
        allowNull: false,
        type: DataTypes.CHAR(3),
    })
    iso3166Alpha3: string;

    @Index
    @Column({
        field: 'iso3166Numeric',
        allowNull: false,
        type: DataTypes.CHAR(3),
    })
    iso3166Numeric: string;

    @Index
    @Column({
        field: 'customCode',
        allowNull: true,
        type: DataTypes.STRING(10),
    })
    customCode: string;

    @Column({
        field: 'prefix',
        allowNull: true,
        type: DataTypes.STRING(5),
    })
    prefix: string;

    @Column({
        field: 'image',
        allowNull: true,
        type: DataTypes.STRING(1024),
    })
    image: string;

    @Column({
        field: 'sort',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    sort: number;

    @Column({
        field: 'administrativeAreas',
        allowNull: true,
        type: DataTypes.JSON,
    })
    administrativeAreas: any;

    @Column({
        field: 'latitude',
        allowNull: true,
        type: DataTypes.DECIMAL(17,4),
    })
    latitude: number;

    @Column({
        field: 'longitude',
        allowNull: true,
        type: DataTypes.DECIMAL(17,4),
    })
    longitude: number;

    @Column({
        field: 'zoom',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    zoom: number;

    @Column({
        field: 'dataLang',
        allowNull: true,
        type: DataTypes.JSON,
    })
    dataLang: any;

    @Column({
        field: 'createdAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;

    @Column({
        field: 'updatedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;

    @Column({
        field: 'deletedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;

    // i18n relation
    @HasOne(() => CommonCountryI18NModel, { as: 'countryI18N' })
    countryI18N: CommonCountryI18NModel;
}