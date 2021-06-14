import { Component, OnInit, ViewChild } from '@angular/core';
import { IncidentService } from '../../../services/incident/incident.service';
import { Incident } from '../../../entities/incident/incident';

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-incidenti',
  templateUrl: './incidenti.component.html',
  styleUrls: ['./incidenti.component.css']
})
export class IncidentiComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Incident>;
  dataSource = new MatTableDataSource<Incident>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['idIncidenta', 'NazivTipIncidenta', 'Prioritet', 'Potvrdjen', 'NazivStatusaIncidenta', 'ETA', 'ATA', 'ETR', 'NivoNapona', 'PlaniranoVremeRada', 'actions' ];

  constructor(private incidentService:IncidentService) {
    this.dataSource = new MatTableDataSource();

    this.incidentService.getAllIncidenti().subscribe((data: Incident[]) => {
      this.dataSource.data = data;
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

  preuzmi(idIncidenta:any) {
    console.log("Preuzmi incident: " + idIncidenta);

    // 0 - logovan korisnik id
    this.incidentService.preuzmi(idIncidenta, 0).subscribe();
  }
}

// export class DataTableDataSource extends DataSource<Incident> {
//   data: Incident[] = [];
//   paginator: MatPaginator | undefined;
//   sort: MatSort | undefined;

//   constructor() {
//     super();
//   }

//   /**
//    * Connect this data source to the table. The table will only update when
//    * the returned stream emits new items.
//    * @returns A stream of the items to be rendered.
//    */
//   connect(): Observable<Incident[]> {
//     if (this.paginator && this.sort) {
//       // Combine everything that affects the rendered data into one update
//       // stream for the data-table to consume.
//       return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
//         .pipe(map(() => {
//           return this.getPagedData(this.getSortedData([...this.data ]));
//         }));
//     } else {
//       throw Error('Please set the paginator and sort on the data source before connecting.');
//     }
//   }

//   /**
//    *  Called when the table is being destroyed. Use this function, to clean up
//    * any open connections or free any held resources that were set up during connect.
//    */
//   disconnect(): void {}

//   /**
//    * Paginate the data (client-side). If you're using server-side pagination,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
//   private getPagedData(data: Incident[]): Incident[] {
//     if (this.paginator) {
//       const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//       return data.splice(startIndex, this.paginator.pageSize);
//     } else {
//       return data;
//     }
//   }

//   /**
//    * Sort the data (client-side). If you're using server-side sorting,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
//   private getSortedData(data: Incident[]): Incident[] {
//     if (!this.sort || !this.sort.active || this.sort.direction === '') {
//       return data;
//     }

//     return data.sort((a, b) => {
//       const isAsc = this.sort?.direction === 'asc';
//       switch (this.sort?.active) {
//         case 'Id incidenta': return compare(a.idIncidenta, b.idIncidenta, isAsc);
//         case 'Tip': return compare(+a.nazivTipIncidenta, +b.nazivTipIncidenta, isAsc);
//         case 'Nivo Napona': return compare(+a.nivoNapona, +b.nivoNapona, isAsc);
//         default: return 0;
//       }
//     });
//   }
// }

// /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
// function compare(a: string | number, b: string | number, isAsc: boolean): number {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }