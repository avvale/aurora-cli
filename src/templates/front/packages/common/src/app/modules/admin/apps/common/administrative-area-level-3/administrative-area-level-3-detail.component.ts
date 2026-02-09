/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
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
  CommonAdministrativeAreaLevel3,
  CommonAdministrativeAreaLevel3MapTypeEnum,
} from '@apps/common';
import { AdministrativeAreaLevel3Service } from '@apps/common/administrative-area-level-3';
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
  selector: 'common-administrative-area-level-3-detail',
  templateUrl: './administrative-area-level-3-detail.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...defaultDetailImports, KeyValuePipe, MatSelectModule],
})
@ActionScope('common::administrativeAreaLevel3.detail')
export class AdministrativeAreaLevel3DetailComponent extends ViewDetailComponent {
  // ---- customizations ----
  commonAdministrativeAreaLevel3MapTypeEnum =
    CommonAdministrativeAreaLevel3MapTypeEnum;

  // Object retrieved from the database request,
  // it should only be used to obtain uninitialized
  // data in the form, such as relations, etc.
  // It should not be used habitually, since the source of truth is the form.
  managedObject: WritableSignal<CommonAdministrativeAreaLevel3> = signal(null);

  // breadcrumb component definition
  breadcrumb: Crumb[] = [
    { translation: 'App' },
    {
      translation: 'common.AdministrativeAreasLevel3',
      routerLink: ['/common/administrative-area-level-3'],
    },
    { translation: 'common.AdministrativeAreaLevel3' },
  ];

  constructor(
    private readonly administrativeAreaLevel3Service: AdministrativeAreaLevel3Service,
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
        'common::administrativeAreaLevel3.detail.new':
          'common::administrativeAreaLevel3.detail.create',
        'common::administrativeAreaLevel3.detail.edit':
          'common::administrativeAreaLevel3.detail.update',
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
      administrativeAreaLevel1Id: [
        null,
        [
          Validators.required,
          Validators.minLength(36),
          Validators.maxLength(36),
        ],
      ],
      administrativeAreaLevel2Id: [
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
      case 'common::administrativeAreaLevel3.detail.new':
        this.fg.get('id').setValue(uuid());
        break;

      case 'common::administrativeAreaLevel3.detail.edit':
        this.administrativeAreaLevel3Service.administrativeAreaLevel3$
          .pipe(takeUntil(this.unsubscribeAll$))
          .subscribe((item) => {
            this.managedObject.set(item);
            this.fg.patchValue(item);
          });
        break;

      case 'common::administrativeAreaLevel3.detail.create':
        try {
          await lastValueFrom(
            this.administrativeAreaLevel3Service.create<CommonAdministrativeAreaLevel3>(
              {
                object: this.fg.value,
              },
            ),
          );

          this.snackBar.open(
            `${this.translocoService.translate('common.AdministrativeAreaLevel3')} ${this.translocoService.translate('Created.M')}`,
            undefined,
            {
              verticalPosition: 'top',
              duration: 3000,
            },
          );

          this.router.navigate(['common/administrative-area-level-3']);
        } catch (error) {
          log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
        }
        break;

      case 'common::administrativeAreaLevel3.detail.update':
        try {
          await lastValueFrom(
            this.administrativeAreaLevel3Service.updateById<CommonAdministrativeAreaLevel3>(
              {
                object: this.fg.value,
              },
            ),
          );

          this.snackBar.open(
            `${this.translocoService.translate('common.AdministrativeAreaLevel3')} ${this.translocoService.translate('Saved.M')}`,
            undefined,
            {
              verticalPosition: 'top',
              duration: 3000,
            },
          );

          this.router.navigate(['common/administrative-area-level-3']);
        } catch (error) {
          log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
        }
        break;
      /* #endregion common actions */
    }
  }
}
