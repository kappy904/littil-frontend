import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesComponent } from './modules.component';
import { RouterModule, Routes } from "@angular/router";
import { ProfileContainerModule } from "../../../components/profile-container/profile-container.module";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
  },
];

@NgModule({
  declarations: [
    ModulesComponent
  ],
  imports: [
    CommonModule,
    ProfileContainerModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [
    ModulesComponent
  ]
})
export class ModulesModule {
}
