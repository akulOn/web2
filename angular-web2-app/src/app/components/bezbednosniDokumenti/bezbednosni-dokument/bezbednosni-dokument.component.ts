import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BezbednosniDokument } from 'src/app/entities/bezbednosni-dokument/bezbednosni-dokument';
import { BezbednosniDokumentService } from 'src/app/services/bezbednosni-dokument/bezbednosni-dokument.service';
import { ActivatedRoute } from '@angular/router';
import { Oprema } from 'src/app/entities/oprema/oprema';

@Component({
  selector: 'app-bezbednosni-dokument',
  templateUrl: './bezbednosni-dokument.component.html',
  styleUrls: ['./bezbednosni-dokument.component.css']
})
export class BezbednosniDokumentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<BezbednosniDokument>;
  dataSource = new MatTableDataSource<BezbednosniDokument>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['idBezbednosnogDokumenta', 'Tip', 'Status', 'Ekipa', 'Detalji', 'Beleske', 'TelefonskiBroj', 'DatumKreiranja',
                      'AllWorkOperationsCompleted', 'AllTagsRemoved', 'GroundingRemoved', 'ReadyForService', 'Action' ];


  @Input()idKorisnika:number = -1;
  naslov:string = "Svi bezbednosni dokumenti";
  Oprema:Oprema[] = [];
  idBezbednosnogDokumenta:number = -1; // incident za kojeg se prikazuje oprema
  
  constructor(
    private bezbednosniDokumentService:BezbednosniDokumentService,
    private route: ActivatedRoute
    ) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id'] != undefined)
        this.idKorisnika = params['id'];
      });
      
    if (this.idKorisnika == -1)
    {
      this.bezbednosniDokumentService.getAllBezbednosneDokumente().subscribe((data:BezbednosniDokument[]) => {
        this.dataSource.data = data
      });
    }
    else
    {
      this.naslov = "Svi bezbednosni dokumenti korisnika: " + this.idKorisnika;

      this.bezbednosniDokumentService.getBezbednosniDokumentKorisnik(this.idKorisnika).subscribe((data:BezbednosniDokument[]) => {
        this.dataSource.data = data
      });
    }
  }

  applyFilter(filterValue:any) {
    this.dataSource.filter = filterValue.value.trim().toLowerCase()
  }

  reciveMessage($event:string) {
    console.log($event);

      this.bezbednosniDokumentService.getAllBezbednosneDokumente().subscribe((data:BezbednosniDokument[]) => {
        this.dataSource.data = data
      });
  }

  prikaziOpremu(idBezbednosnogDokumenta:number) {
    this.idBezbednosnogDokumenta = idBezbednosnogDokumenta;

    this.bezbednosniDokumentService.getOprema(idBezbednosnogDokumenta).subscribe(data => {
      this.Oprema = data;
    });
  }

  removeOprema(idOpreme:number) {
    this.bezbednosniDokumentService.deleteOpremaFromBezbednosniDokument(this.idBezbednosnogDokumenta, idOpreme).subscribe(data => {

      this.bezbednosniDokumentService.getOprema(this.idBezbednosnogDokumenta).subscribe(data => {
        this.Oprema = data;
      });
      
    });
  }
}

