/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
  WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {
  CommonAdministrativeAreaLevel1,
  CommonAdministrativeAreaLevel1MapTypeEnum,
} from '@apps/common';
import { AdministrativeAreaLevel1Service } from '@apps/common/administrative-area-level-1';
import {
  Action,
  ActionScope,
  Crumb,
  defaultDetailImports,
  log,
  mapActions,
  SnackBarInvalidFormComponent,
  uuid,
  ViewDetailComponent,
} from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
  selector: 'common-administrative-area-level-1-detail',
  templateUrl: './administrative-area-level-1-detail.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...defaultDetailImports, KeyValuePipe, MatSelectModule],
})
@ActionScope('common::administrativeAreaLevel1.detail')
export class AdministrativeAreaLevel1DetailComponent extends ViewDetailComponent {
  // ---- customizations ----
  commonAdministrativeAreaLevel1MapTypeEnum =
    CommonAdministrativeAreaLevel1MapTypeEnum;

  // Object retrieved from the database request,
  // it should only be used to obtain uninitialized
  // data in the form, such as relations, etc.
  // It should not be used habitually, since the source of truth is the form.
  managedObject: WritableSignal<CommonAdministrativeAreaLevel1> = signal(null);

  // breadcrumb component definition
  breadcrumb: Crumb[] = [
    { translation: 'App' },
    {
      translation: 'common.AdministrativeAreasLevel1',
      routerLink: ['/common/administrative-area-level-1'],
    },
    { translation: 'common.AdministrativeAreaLevel1' },
  ];

  constructor(
    private readonly administrativeAreaLevel1Service: AdministrativeAreaLevel1Service,
  ) {
    super();
  }

  // this method will be called after the ngOnInit of
  // the parent class you can use instead of ngOnInit
  init(): void {
    /**/
  }

  onSubmit($event): void {
    // we have two nested forms, we check that the submit comes from the button
    // that corresponds to the main form to the main form
    if (
      $event.submitter.getAttribute('form') !==
      $event.submitter.form.getAttribute('id')
    ) {
      $event.preventDefault();
      $event.stopPropagation();
      return;
    }

    // manage validations before execute actions
    if (this.fg.invalid) {
      log('[DEBUG] Error to validate form: ', this.fg);
      this.validationMessagesService.validate();

      this.snackBar.openFromComponent(SnackBarInvalidFormComponent, {
        data: {
          message: `${this.translocoService.translate('InvalidForm')}`,
          textButton: `${this.translocoService.translate('InvalidFormOk')}`,
        },
        panelClass: 'error-snackbar',
        verticalPosition: 'top',
        duration: 10000,
      });
      return;
    }

    this.actionService.action({
      id: mapActions(this.currentViewAction.id, {
        'common::administrativeAreaLevel1.detail.new':
          'common::administrativeAreaLevel1.detail.create',
        'common::administrativeAreaLevel1.detail.edit':
          'common::administrativeAreaLevel1.detail.update',
      }),
      isViewAction: false,
    });
  }

  createForm(): void {
    /* eslint-disable key-spacing */
    this.fg = this.fb.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(36),
          Validators.maxLength(36),
        ],
      ],
      countryId: [
        null,
        [
          Validators.required,
          Validators.minLength(36),
          Validators.maxLength(36),
        ],
      ],
      code: ['', [Validators.required, Validators.maxLength(8)]],
      customCode: ['', [Validators.maxLength(64)]],
      name: ['', [Validators.required, Validators.maxLength(128)]],
      slug: ['', [Validators.required, Validators.maxLength(128)]],
      latitude: null,
      longitude: null,
      zoom: [null, [Validators.maxLength(2)]],
      mapType: [null, [Validators.required]],
    });
    /* eslint-enable key-spacing */
  }

  async handleAction(action: Action): Promise<void> {
    // add optional chaining (?.) to avoid first call where behaviour subject is undefined
    switch (action?.id) {
      /* #region common actions */
      case 'common::administrativeAreaLevel1.detail.new':
        this.fg.get('id').setValue(uuid());
        break;

      case 'common::administrativeAreaLevel1.detail.edit':
        this.administrativeAreaLevel1Service.administrativeAreaLevel1$
          .pipe(takeUntil(this.unsubscribeAll$))
          .subscribe((item) => {
            this.managedObject.set(item);
            this.fg.patchValue(item);
          });
        break;

      case 'common::administrativeAreaLevel1.detail.create':
        try {
          await lastValueFrom(
            this.administrativeAreaLevel1Service.create<CommonAdministrativeAreaLevel1>(
              {
                object: this.fg.value,
              },
            ),
          );

          this.snackBar.open(
            `${this.translocoService.translate('common.AdministrativeAreaLevel1')} ${this.translocoService.translate('Created.M')}`,
            undefined,
            {
              verticalPosition: 'top',
              duration: 3000,
            },
          );

          this.router.navigate(['common/administrative-area-level-1']);
        } catch (error) {
          log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
        }
        break;

      case 'common::administrativeAreaLevel1.detail.update':
        try {
          await lastValueFrom(
            this.administrativeAreaLevel1Service.updateById<CommonAdministrativeAreaLevel1>(
              {
                object: this.fg.value,
              },
            ),
          );

          this.snackBar.open(
            `${this.translocoService.translate('common.AdministrativeAreaLevel1')} ${this.translocoService.translate('Saved.M')}`,
            undefined,
            {
              verticalPosition: 'top',
              duration: 3000,
            },
          );

          this.router.navigate(['common/administrative-area-level-1']);
        } catch (error) {
          log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
        }
        break;
      /* #endregion common actions */
    }
  }
}
