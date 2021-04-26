import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Oprema } from 'src/app/entities/oprema/oprema';
import { OpremaService } from 'src/app/services/oprema/oprema.service';
import { MatButtonModule } from '@angular/material/button';
import { UredenjeElemenataMrezeComponent } from '../uredenje-elemenata-mreze/uredenje-elemenata-mreze.component';

@Component({
  selector: 'app-pregled-elemenata-mreze',
  templateUrl: './pregled-elemenata-mreze.component.html',
  styleUrls: ['./pregled-elemenata-mreze.component.css']
})
export class PregledElemenataMrezeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Oprema>;
  dataSource = new MatTableDataSource<Oprema>();

  @ViewChild(UredenjeElemenataMrezeComponent) child!:UredenjeElemenataMrezeComponent;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['idOpreme', 'Naziv', 'Tip', 'Kordinate', 'Adresa', 'actions' ];

  constructor(private opremaService:OpremaService) {
    this.dataSource = new MatTableDataSource();

    this.opremaService.getAllOprema().subscribe((data:Oprema[]) => {
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

  ObrisiElementMreze(id:number) {
    console.log(id)

    this.opremaService.deleteOprema(id).subscribe((data:Oprema[]) => {
      this.opremaService.getAllOprema().subscribe((data:Oprema[]) => {
        this.dataSource.data = data
        console.log(data)
      });
    });
  }

  posaljiIdElementa(element:any, id:number) {
    console.log(element);
    
    this.child.FormConstructor(id);
  }

  reciveMessage($event:string) {
    console.log($event);

    setTimeout(() => {
      this.opremaService.getAllOprema().subscribe((data:Oprema[]) => {
        this.dataSource.data = data
        console.log(data)
      });
    }, 250); // cekaj 0.250 sekundi
  }
}
