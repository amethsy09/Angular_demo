import {Component, computed, signal,effect} from '@angular/core';

 interface Transaction {
  id: number;
  libelle: string;
  montant: number;
  motif:string;
  type:"credit"|"debit";
  categorie:"salaire"|"nouriture"|"transport";

}
@Component({
  selector: 'app-transaction-card',
  standalone:true,
  templateUrl: './transaction-card.html',
  styleUrl: './transaction-card.scss',
})

export class TransactionCard {
  transactions = signal<Transaction[]>([
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
    }
   ]);
  
  filtreActif= signal('tous');

  // totalEntrees : Somme des montants de type 'credit'.
  totalEntrees = computed(() =>
    this.transactions().filter(t => t.type === 'credit').reduce((somme, t) => somme + t.montant, 0)
  );
  // totalSorties : Somme des montants de type 'debit'.
  totalSorties = computed(() =>
    this.transactions().filter(t => t.type === 'debit').reduce((somme, t) => somme + t.montant, 0)
  );
  // soldeActuel : totalEntrees() - totalSorties().
  soldeActuel = computed(() => this.totalEntrees() - this.totalSorties());
  // transactionsFiltrees : Retourne la liste des transactions filtrée selon la valeur du signal filtreActif() (ex: si 'CREDIT', ne retourner que les entrées).
  transactionsFiltrees = computed(() => {
   switch (this.filtreActif()) {
     case 'CREDIT':
       return this.transactions().filter(t => t.type === 'credit');
     case 'DEBIT':
       return this.transactions().filter(t => t.type === 'debit');
     default:
             return this.transactions();
   }
});
// Logique Microfinance : Ajoutez un computed() nommé scoreCredit. Si le soldeActuel() est supérieur à 100 000 FCFA et qu'aucun débit récent ne dépasse 50% des entrées, le score est "Éligible au micro-crédit", sinon "Non éligible".
  scoreCredit = computed(() => {
    if (this.soldeActuel() > 100000) {
      const recentDebits = this.transactions().filter(t => t.type === 'debit');
      const totalEntries = this.totalEntrees();
      if (recentDebits.every(d => d.montant <= totalEntries * 0.5)) {
        return "Éligible au micro-crédit";
      }
    }
    return "Non éligible";
  });
  // Ajoutez un formulaire simple (ou juste un bouton pour l'instant) pour simuler l'ajout d'une nouvelle transaction via this.transactions.update(t => [...t, nouvelleTransaction]).
  ajouterTransaction() {
    const nouvelleTransaction: Transaction = {
      id: this.transactions().length + 1,
      libelle: 'Nouvelle transaction',
      montant: 20000,
      motif: 'achat',
      type: 'debit',
      categorie: 'nouriture'
    };
    this.transactions.update(t => [...t, nouvelleTransaction]);
  }
  // Dans le constructor() de votre composant, déclarez un effect(). Demandez-lui d'afficher un console.log() personnalisé à chaque fois qu'une transaction est ajoutée.
  constructor() {
    const savedTransactions =
    localStorage.getItem('transactions');

  if (savedTransactions) {
    this.transactions.set(
      JSON.parse(savedTransactions)
    );
  }
    effect(() => {
      console.log(`Nombre de transactions : ${this.transactions().length}`);
      localStorage.setItem(
      'transactions',
      JSON.stringify(this.transactions())
    );
    });
  }
 

}
