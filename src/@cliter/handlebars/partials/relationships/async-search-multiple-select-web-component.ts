import * as handlebars from 'handlebars';

handlebars.registerPartial('asyncSearchMultipleSelectWebComponent',
    `<mat-form-field
    appearance="outline"
    class="{{ calculateFormGroupCol property }}"
>
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <mat-select
        formControlName="{{ toCamelCase property.relationship.singularName }}Ids"
        multiple
        auScrollEnd
        (scrollEnd)="
            {{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ManageAsyncMatSelectSearch({
                asyncMatSelectSearchState: {{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}AsyncMatSelectSearchState,
                isFromScrollEndEvent: true,
                noResultsFoundTranslation: t('NoResultsFound'),
            })
        "
        [required]="fg.get('{{ toCamelCase property.relationship.singularName }}Ids') | hasValidator: 'required'"
    >
        <mat-option>
            <ngx-mat-select-search
                [formControl]="{{ toCamelCase (getModuleNamesFromPropertyRelationship relationship.modulePath) }}AsyncMatSelectSearchState.itemFilterCtrl"
                [placeholderLabel]="t('{{ toCamelCase schema.boundedContextName }}.Find{{ toPascalCase property.relationship.singularName }}')"
                [noEntriesFoundLabel]="t('NoResultsFound')"
            >
            </ngx-mat-select-search>
        </mat-option>
        @if ({{ toCamelCase (getModuleNamesFromPropertyRelationship relationship.modulePath) }}AsyncMatSelectSearchState.selectedItems().size > 0)
        {
            <mat-optgroup [label]="t('SelectedOptions')">
                @for ({{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }} of {{ toCamelCase (getModuleNamesFromPropertyRelationship relationship.modulePath) }}AsyncMatSelectSearchState.selectedItems(); track {{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}.id)
                {
                    <mat-option
                        auMatSelectAddSelectedDirective
                        [value]="{{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}.id"
                        [object]="{{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}"
                        [selectedItems]="{{ toCamelCase (getModuleNamesFromPropertyRelationship relationship.modulePath) }}AsyncMatSelectSearchState.selectedItems"
                    >
                        \\{{ {{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}.name }}
                    </mat-option>
                }
            </mat-optgroup>
            <mat-divider></mat-divider>
        }
        @for ({{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }} of {{ toCamelCase (getModuleNamesFromPropertyRelationship relationship.modulePath) }}AsyncMatSelectSearchState.filteredItems(); track {{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}.id)
        {
            @if (!{{ toCamelCase (getModuleNamesFromPropertyRelationship relationship.modulePath) }}AsyncMatSelectSearchState.selectedItems().has({{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}))
            {
                <mat-option
                    auMatSelectAddSelectedDirective
                    [value]="{{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}.id"
                    [disabled]="{{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}.id === null"
                    [object]="{{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}"
                    [selectedItems]="{{ toCamelCase (getModuleNamesFromPropertyRelationship relationship.modulePath) }}AsyncMatSelectSearchState.selectedItems"
                >
                    \\{{ {{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}.name }}
                </mat-option>
            }
        }
    </mat-select>
    @if ({{ toCamelCase (getModuleNamesFromPropertyRelationship relationship.modulePath) }}AsyncMatSelectSearchState.isLoading())
    {
        <mat-icon matSuffix>
            <mat-spinner diameter="20"></mat-spinner>
        </mat-icon>
    }
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.relationship.singularName }}Ids | async }}</mat-error>
</mat-form-field>`);
