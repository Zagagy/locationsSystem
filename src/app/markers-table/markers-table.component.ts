import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {UserDataService} from '../user-data.service';
import {FlowService} from '../flow.service';
import {StylesService} from '../styles.service';
import {DialogsService} from '../dialogs.service';
import * as fileSaver from 'file-saver';
import {CommunicatorService} from '../communicator.service';
import {HelpService} from '../help.service';

@Component({
  selector: 'markers-table',
  styleUrls: ['markers-table.component.css'],
  templateUrl: 'markers-table.component.html',
})

export class MarkersTableComponent implements OnInit {
  displayedColumns = ['num', 'longitude', 'latitude', 'comment', 'delete'];
  dataSource: MatTableDataSource<RowContent>;
  subscriptionForDataChange;

  constructor(private userData: UserDataService, private flowService: FlowService,
              private stylesService: StylesService, private dialogsService: DialogsService, private helpService: HelpService) {
    this.dataSource = new MatTableDataSource(userData.getMarkers());
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.subscriptionForDataChange = this.userData.getDataChangeEmitter()
      .subscribe(newData => this.dataChangedEventHandler(newData));
  }

  private dataChangedEventHandler(newData: any) {
    this.dataSource.data = newData;
  }

  private rowClicked(rowContent) {
    if (rowContent) {
      let latLanObj = {lat: parseInt(rowContent['latitude']), lng : parseInt(rowContent['longitude'])};
      this.flowService.raiseMarkerSelectionEvent(latLanObj);
    }
  }

  private deleteRow(index, event) {
    event.stopPropagation();
    this.flowService.setDeleteRowCandidate(index);
    this.dialogsService.openDeleteMarkerDialog();

  }

  exportData() {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(this.dataSource.data[0]);
    let csv = this.dataSource.data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], {type: 'text/csv' })
    fileSaver.saveAs(blob, "locations.csv");
  }
}
export interface RowContent {
  num: number;
  longitude: string;
  latitude: string;
  comment: string;
}
