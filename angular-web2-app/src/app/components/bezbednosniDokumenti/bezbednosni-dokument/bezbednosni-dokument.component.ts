import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BezbednosniDokument } from 'src/app/entities/bezbednosni-dokument/bezbednosni-dokument';
import { BezbednosniDokumentService } from 'src/app/services/bezbednosni-dokument/bezbednosni-dokument.service';

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
  displayedColumns = ['idBezbednosnogDokumenta', 'Tip', 'Status', 'Ekipa', 'Detalji', 'Beleske', 'TelefonskiBroj', 'DatumKreiranja' ];
  //,'AllWorkOperationsCompleted', 'AllTagsRemoved', 'GroundingRemoved', 'ReadyForService'

  showDodavanjeDokumenta:boolean = false;

  constructor(private bezbednosniDokumentService:BezbednosniDokumentService) {
    this.dataSource = new MatTableDataSource();

    this.bezbednosniDokumentService.getAllBezbednosneDokumente().subscribe((data:BezbednosniDokument[]) => {
      this.dataSource.data = data
      console.log(data)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    
  }

  applyFilter(filterValue:any) {
    this.dataSource.filter = filterValue.value.trim().toLowerCase()
  }

  showDodavanje() {
    this.showDodavanjeDokumenta = !this.showDodavanjeDokumenta;
  }

  reciveMessage($event:string) {
    this.showDodavanjeDokumenta = !this.showDodavanjeDokumenta;
    console.log($event);

    setTimeout(() => {
      this.bezbednosniDokumentService.getAllBezbednosneDokumente().subscribe((data:BezbednosniDokument[]) => {
        this.dataSource.data = data
        console.log(data)
      });
    }, 250); // cekaj 0.250 sekundi
  }
}

