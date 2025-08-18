import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vip.component.html',
  styleUrl: './vip.component.scss'
})
export class VipComponent {
  @Input() sectionTitle = '';
  @Input() sectionDescription = '';
  @Input() vipBlockItems:{
    icon: string,
    iconImageAlt: string,
    itemName: string,
    itemDescription: string,
  }[] = []
  
  constructor(){
  }
  ngOnInit(): void{
  }
}
