import { Component, input, output } from '@angular/core';

export enum Status {
  EN_ATTENTE = 'EN-ATTENTE',
  VALIDE = 'VALIDE',
  REJETER = 'REJETER'
}

@Component({
  selector: 'app-status-badge',
  imports: [],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {
  status = input<Status>();

  onChangeStatus = output<Status>();

  Status = Status;

  changeStatus(newStatus: Event) {
    const value = (newStatus.target as HTMLSelectElement)?.value as Status;
    
    this.onChangeStatus.emit(value);
  }
}
