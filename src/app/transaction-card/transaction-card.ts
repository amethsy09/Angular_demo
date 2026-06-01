import {Component} from '@angular/core';

Component({
  selector: 'app-transaction-card',
  standalone:true,
  templateUrl: './transaction-card.html',
  styleUrl: './transaction-card.scss',
})

 interface Transaction {
  id: number;
  libelle: string;
  montant: number;
  motif:string;
  type:"credit"|"debit";
  categorie:"salaire"|"nouriture"|"transport";


}
export class TransactionCard {
  transactions: Transaction[] = [
    {
      id: 1,
      libelle: 'Paiement facture',
      montant: 15000,
      motif: 'thiokh',
      type: 'credit',
      categorie: 'salaire',
    },
    {
      id: 2,
      libelle: 'Paiement facture',
      montant: 15000,
      motif: 'thiokh',
      type: 'credit',
      categorie: 'salaire',
    },
    {
      id: 3,
      libelle: 'Paiement facture',
      montant: 15000,
      motif: 'thiokh',
      type: 'credit',
      categorie: 'salaire',
    },
    {
      id: 4,
      libelle: 'Paiement facture',
      montant: 15000,
      motif: 'thiokh',
      type: 'credit',
      categorie: 'salaire',
    },
    {
      id: 5,
      libelle: 'Paiement facture',
      montant: 15000,
      motif: 'thiokh',
      type: 'debit',
      categorie:"salaire",
    },
    {
      id: 6,
      libelle: 'Paiement facture',
      montant: 15000,
      motif: 'thiokh',
      type: 'credit',
      categorie: 'salaire',
    },
    {
      id: 7,
      libelle: 'Paiement facture',
      montant: 15000,
      motif: 'thiokh',
      type: "debit",
      categorie: "transport"
    },
  ];

  voirDetails(id: number) {
    const transaction = this.transactions.find((t) => t.id == id);
    alert(
      `Transaction:
      Libelle: ${transaction?.libelle}
      Montant:${transaction?.montant}
      `,
    );
  }
}
