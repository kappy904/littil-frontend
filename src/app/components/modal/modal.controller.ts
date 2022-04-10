import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalController {
  private _modalIsActive: boolean = false;
  constructor(private dialog: MatDialog, private router: Router) {}
  private _routerSubscription!: Subscription;
  present<OutPutDataType, InputDataType>(
    component: IModalComponentConstructor<OutPutDataType, InputDataType>,
    data?: InputDataType
  ): Promise<OutPutDataType> {
    return new Promise<OutPutDataType>((resolve) => {
      this._routerSubscription = this.router.events.subscribe((event: any) => {
        if (this._modalIsActive) {
          this.closeAll();
          return false;
        }
        return true;
      });
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;

      const matDialogRef = this.dialog.open(component, dialogConfig);
      const componentInstance: IModalComponent<OutPutDataType, InputDataType> =
        matDialogRef.componentInstance;
      this._modalIsActive = true;
      componentInstance.close = (d: OutPutDataType) => {
        matDialogRef.close(d);
      };

      matDialogRef.afterOpened().subscribe(() => {
        if (typeof componentInstance.onOpen === 'function' && data) {
          componentInstance.onOpen(data);
        }
      });

      matDialogRef.afterClosed().subscribe((data) => {
        this._modalIsActive = false;
        this._routerSubscription.unsubscribe();
        resolve(data);
      });
      return matDialogRef;
    });
  }

  closeAll(): Promise<any> {
    return Promise.resolve(this.dialog.closeAll());
  }
}

export interface IModalComponentConstructor<OutPutDataType, InputDataType> {
  new (...args: any[]): IModalComponent<OutPutDataType, InputDataType>;
}

export interface IModalComponent<OutPutDataType, InputDataType> {
  onOpen?: (data: InputDataType) => any;
  close: (data: OutPutDataType) => any;
}
