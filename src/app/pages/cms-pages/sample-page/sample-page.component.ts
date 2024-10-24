import { Component, OnInit } from '@angular/core';
import { StoreLocatorModalComponent } from '../../../common/pages-common/store-locator-modal/store-locator-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrl: './sample-page.component.scss'
})
export class SamplePageComponent implements OnInit {
  constructor(private storeModalService: NgbModal){}
  ngOnInit(): void {
  }
  storeLocatorModel(){
    this.storeModalService.open(StoreLocatorModalComponent, {
      size: 'xl',
    })
  }
}