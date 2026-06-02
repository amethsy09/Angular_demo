import { Component, computed, signal, effect } from '@angular/core';

interface Transaction {
  id: number;
  libelle: string;
  montant: number;
  motif: string;
  type: "credit" | "debit";
  categorie: "salaire" | "nouriture" | "transport";
}

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  templateUrl: './transaction-card.html',
  styleUrl: './transaction-card.scss',
})
export class TransactionCard {

  pageCourante = signal(1);
  transactionsParPage = 5;
  isModalOpen = signal(false);
  idrecherche = signal(0);
  filtreActif = signal('tous');
  libelleRecherche = signal('');
  libelleForm = signal('');
  montantForm = signal(0);
  motifForm = signal('');
  typeForm = signal<'credit' | 'debit'>('credit');
  categorieForm = signal<'salaire' | 'nouriture' | 'transport'>('salaire');
  transactions = signal<Transaction[]>([
    { id: 1, libelle: 'Paiement facture', montant: 15000, motif: 'thiokh', type: 'credit', categorie: 'salaire' },
    { id: 2, libelle: 'Paiement facture', montant: 15000, motif: 'thiokh', type: 'credit', categorie: 'salaire' },
    { id: 3, libelle: 'Paiement facture', montant: 15000, motif: 'thiokh', type: 'credit', categorie: 'salaire' },
    { id: 4, libelle: 'Paiement facture', montant: 15000, motif: 'thiokh', type: 'credit', categorie: 'salaire' },
    { id: 5, libelle: 'Paiement facture', montant: 15000, motif: 'thiokh', type: 'debit', categorie: 'salaire' },
    { id: 6, libelle: 'Paiement facture', montant: 15000, motif: 'thiokh', type: 'credit', categorie: 'salaire' },
    { id: 7, libelle: 'Paiement facture', montant: 15000, motif: 'thiokh', type: 'debit', categorie: 'transport' }
  ]);


  transactionsFiltrees = computed(() => {
    let data = this.transactions();
    switch (this.filtreActif()) {
      case 'CREDIT':
        data = data.filter(t => t.type === 'credit');
        break;
      case 'DEBIT':
        data = data.filter(t => t.type === 'debit');
        break;
    }

    // filtre libellé
    const libelle = this.libelleRecherche().toLowerCase().trim();

    if (libelle) {
      data = data.filter(t =>
        t.libelle.toLowerCase().includes(libelle)
      );
    }

    return data;
  });


  totalPages = computed(() =>
    Math.ceil(this.transactionsFiltrees().length / this.transactionsParPage)
  );

  transactionsPaginees = computed(() => {
    const debut = (this.pageCourante() - 1) * this.transactionsParPage;
    const fin = debut + this.transactionsParPage;

    return this.transactionsFiltrees().slice(debut, fin);
  });

  boutonPrecedentDesactive = computed(() => this.pageCourante() <= 1);

  boutonSuivantDesactive = computed(() =>
    this.pageCourante() >= this.totalPages()
  );


  precedente() {
    if (this.pageCourante() > 1) {
      this.pageCourante.update(p => p - 1);
    }
  }

  suivante() {
    if (this.pageCourante() < this.totalPages()) {
      this.pageCourante.update(p => p + 1);
    }
  }



  totalEntrees = computed(() =>
    this.transactions().filter(t => t.type === 'credit')
      .reduce((s, t) => s + t.montant, 0)
  );

  totalSorties = computed(() =>
    this.transactions().filter(t => t.type === 'debit')
      .reduce((s, t) => s + t.montant, 0)
  );

  soldeActuel = computed(() =>
    this.totalEntrees() - this.totalSorties()
  );

  scoreCredit = computed(() => {
    if (this.soldeActuel() > 100000) {
      return "Éligible au micro-crédit";
    }
    return "Non éligible";
  });


  // ajouterTransaction() {
  //   const nouvelleTransaction: Transaction = {
  //     // id: this.transactions().length + 1
  //     id: Math.max(...this.transactions().map(t => t.id), 0) + 1,
  //     libelle: 'Nouvelle transaction',
  //     montant: 20000,
  //     motif: 'achat',
  //     type: 'debit',
  //     categorie: 'nouriture'
  //   };

  //   this.transactions.update(t => [...t, nouvelleTransaction]);
  // }
  ajouterTransaction() {
     if (
    !this.libelleForm().trim() ||
    this.montantForm() <= 0 ||
    !this.motifForm().trim()
  ) {
    alert("Veuillez remplir correctement le formulaire");
    return;
  }
    const nouvelleTransaction: Transaction = {
      id: Math.max(...this.transactions().map(t => t.id), 0) + 1,
      libelle: this.libelleForm(),
      montant: this.montantForm(),
      motif: this.motifForm(),
      type: this.typeForm(),
      categorie: this.categorieForm()
    };

    this.transactions.update(list => [...list, nouvelleTransaction]);
    this.libelleForm.set('');
    this.montantForm.set(0);
    this.motifForm.set('');
    this.typeForm.set('credit');
    this.categorieForm.set('salaire');
  }
  onTypeChange(event: Event) {
  const value = (event.target as HTMLSelectElement)?.value;

  if (value === 'credit' || value === 'debit') {
    this.typeForm.set(value);
  }
}
onCategorieChange(event: Event) {
  const value = (event.target as HTMLSelectElement)?.value;

  if (
    value === 'salaire' ||
    value === 'nouriture' ||
    value === 'transport'
  ) {
    this.categorieForm.set(value);
  }
}
ouvrirModal() {
  this.isModalOpen.set(true);

  this.libelleForm.set('');
  this.montantForm.set(0);
  this.motifForm.set('');
  this.typeForm.set('credit');
  this.categorieForm.set('salaire');
}
  supprimerTransaction(id: number) {
    this.transactions.update(t => t.filter(t => t.id !== id));
  }

  constructor() {
    const saved = localStorage.getItem('transactions');

    if (saved) {
      this.transactions.set(JSON.parse(saved));
    }

    effect(() => {
      console.log(`Transactions: ${this.transactions().length}`);
      localStorage.setItem('transactions', JSON.stringify(this.transactions()));
    });
  }
}