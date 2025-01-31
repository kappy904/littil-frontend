import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { User } from '../../api/generated';
import { LittilUserService } from '../../services/littil-user/littil-user.service';
import { FormUtil } from '../../utils/form.util';
import { IModalComponent } from '../modal/modal.controller';

@Component({
  selector: 'littil-register-modal',
  templateUrl: 'register-modal.component.html',
  animations: [
    trigger('hideShow', [
      state(
        'hidden',
        style({
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      transition('hidden => visible', [animate('200ms')]),
    ]),
  ],
})
export class RegisterModalComponent
  implements IModalComponent<IRegisterModalOutput, undefined>
{
  close!: (response: IRegisterModalOutput) => IRegisterModalOutput;
  public loading = false;
  public hideForm = false;
  public hideConfirmation = true;
  FormUtil = FormUtil;

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private readonly userService: LittilUserService) {}

  public async onClickRegister(): Promise<boolean> {
    return Promise.resolve().then(() => {
      FormUtil.ValidateAll(this.registerForm);
      if (this.registerForm.invalid) {
        return false;
      }
      return firstValueFrom(
        this.userService.create({
          emailAddress: this.registerForm.controls['email'].value,
        } as User)
      )
        .then(() => {
          this.hideForm = true;
          this.hideConfirmation = false;
          return true;
        })
        .catch((error: any) => {
          console.error('Creating user error', error);
          return false;
        });
    });
  }

  public closeModal() {
    this.close({ triggerLogin: false });
  }

  public onClickLogin() {
    this.close({ triggerLogin: true });
  }
}

export interface IRegisterModalOutput {
  triggerLogin: boolean;
}
