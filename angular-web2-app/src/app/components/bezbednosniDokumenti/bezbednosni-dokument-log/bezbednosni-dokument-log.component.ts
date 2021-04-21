import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {  MatButtonModule } from '@angular/material/button';
import { BezbednosniDokumentLog } from 'src/app/entities/bezbednosni-dokument-log/bezbednosni-dokument-log';
import { BezbednosniDokumentLogService } from 'src/app/services/bezbednosni-dokument-log/bezbednosni-dokument-log.service';
import { BezbednosniDokumentService } from 'src/app/services/bezbednosni-dokument/bezbednosni-dokument.service';

@Component({
  selector: 'app-bezbednosni-dokument-log',
  templateUrl: './bezbednosni-dokument-log.component.html',
  styleUrls: ['./bezbednosni-dokument-log.component.css']
})
export class BezbednosniDokumentLogComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<BezbednosniDokumentLog>;
  dataSource = new MatTableDataSource<BezbednosniDokumentLog>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['idBezbednosnogDokumenta', 'Status', 'DatumPromene', 'actions' ];

  items: any[] = [
    { id: 0, status: ''},
    { id: 1, status: 'Drafted' },
    { id: 2, status: 'Issue' },
    { id: 3, status: 'Cancel' },
  ];

  constructor(private bezbednosniDokumentLogService:BezbednosniDokumentLogService, private bezbednosniDokumentService:BezbednosniDokumentService) {
    this.dataSource = new MatTableDataSource();

    this.bezbednosniDokumentLogService.getAllBezbednosneDokumenteLog().subscribe((data:BezbednosniDokumentLog[]) => {
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

  selectOption(idStatusa: any, idBezbednosnogDokumenta: number, Status:string) {
    let item:any = this.items.find(x => x.id == idStatusa.value);

    console.log(idStatusa.value + " - " + idBezbednosnogDokumenta + " - " + Status)
    console.log(item)

    if(item.status == Status)
    {
      console.warn("Izabrali ste isti status!");
      return;
    }
    if(item.status == '')
    {
      console.warn("Izabrali ste nevalidan status!");
      return;
    }

    this.bezbednosniDokumentService.updateBezbednosniDokument(idBezbednosnogDokumenta, idStatusa.value).subscribe();
    window.location.reload();
  }
}
