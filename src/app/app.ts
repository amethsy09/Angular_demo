import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionCard } from './transaction-card/transaction-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TransactionCard],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('wallet');
}
