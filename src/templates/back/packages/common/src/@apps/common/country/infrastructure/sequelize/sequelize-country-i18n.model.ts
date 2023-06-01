/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CommonCountryModel } from '@app/common/country/infrastructure/sequelize/sequelize-country.model';
import { CommonLangModel } from '@app/common/lang/infrastructure/sequelize/sequelize-lang.model';

@Table({ modelName: 'CommonCountryI18n', freezeTableName: true, timestamps: false })
export class CommonCountryI18nModel extends Model<CommonCountryI18nModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => CommonCountryModel)
    @Unique('uniqueLangId')
    @Column({
        field: 'countryId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    countryId: string;

    @BelongsTo(() => CommonCountryModel, { constraints: false })
    country: CommonCountryModel;

    @ForeignKey(() => CommonLangModel)
    @Unique('uniqueLangId')
    @Column({
        field: 'langId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    langId: string;

    @BelongsTo(() => CommonLangModel, { constraints: false })
    lang: CommonLangModel;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(undefined),
    })
    name: string;

    @Column({
        field: 'slug',
        allowNull: false,
        type: DataTypes.STRING(1024),
    })
    slug: string;

    @Column({
        field: 'administrativeAreaLevel1',
        allowNull: true,
        type: DataTypes.STRING(50),
    })
    administrativeAreaLevel1: string;

    @Column({
        field: 'administrativeAreaLevel2',
        allowNull: true,
        type: DataTypes.STRING(50),
    })
    administrativeAreaLevel2: string;

    @Column({
        field: 'administrativeAreaLevel3',
        allowNull: true,
        type: DataTypes.STRING(50),
    })
    administrativeAreaLevel3: string;

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

}