import { inject } from '@angular/core';
import { DocumentNode } from '@apollo/client/core';
import { SlugService } from '@aurora';
import { lastValueFrom } from 'rxjs';

/**
 * SlugMixin exposes the variables:
 * - slugService: SlugService, to make the API call.
 * - checkingSlug: boolean, to display a spinner while the call is being made.
 *
 * you can use the checkSlug method exposed by the mixin in the following way:
 *
 * const slug = await this.checkSlug({
 *      graphqlStatement: checkingSlugQuery,
 *      slug            : action.meta.slug,
 *      id              : this.managedObject?.id || undefined,
 *      contentLanguage : this.currentLang[this.sessionService.get('searchKeyLang')],
 *
 * });
 *
 * this.fg.get('slug').setValue(slug);
 *
 * to use it in the template you can use the following example:
 *
 * <mat-form-field
 *   appearance="outline"
 *   class="col-12"
 * >
 *   <mat-label>{{ t('Slug') }}</mat-label>
 *   <mat-spinner
 *       *ngIf="checkingSlug"
 *       matPrefix
 *       mode="indeterminate"
 *       diameter="17"
 *       class="ml-3 mr-1"
 *   >
 *   </mat-spinner>
 *   <input
 *       matInput
 *       auSlug
 *       formControlName="slug"
 *       maxlength="100"
 *       required
 *       (slug)="
 *           actionService.action({
 *               id          : 'my-bounded-context::my-module.detail.slug',
 *               isViewAction: false,
 *               meta    : {
 *                   slug: $event
 *               }
 *           })
 *       "
 *   >
 *   <mat-error>{{ formErrors?.slug | async }}</mat-error>
 * </mat-form-field>
 */

type GConstructor<T> = new (...args: any[]) => T;
type GConstructorBase = GConstructor<{ /**/ }>;

export const SlugMixin = <TBase extends GConstructorBase>(Base: TBase): any =>
{
    return class extends Base
    {
        slugService: SlugService = inject(SlugService);
        checkingSlug: boolean = false;

        async checkSlug({
            graphqlStatement = null,
            slug = '',
            id = undefined,
            contentLanguage = '*',
        }: {
            graphqlStatement?: DocumentNode;
            slug?: string;
            id?: string;
            contentLanguage?: string;
        }): Promise<string>
        {
            this.checkingSlug = true;
            const response = await lastValueFrom(
                this.slugService
                    .checkSlug({
                        graphqlStatement,
                        slug,
                        id,
                        headers: {
                            'Content-Language': contentLanguage,
                        },
                    }),
            );
            this.checkingSlug = false;
            return response.slug;
        }
    };
};