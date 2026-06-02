import { Component, signal } from '@angular/core';
import { TransactionCard } from './transaction-card/transaction-card';

@Component({
  selector: 'app-root',
  imports: [TransactionCard],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('wallet');
}
