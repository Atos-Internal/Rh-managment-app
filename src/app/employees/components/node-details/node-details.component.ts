import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.scss']
})
export class NodeDetailsComponent implements OnInit {

  @Input() node: Node = new Node();
  @Output() selectedNode = new EventEmitter<Node>();

  progressValue = 0;
  progressType: 'success' | 'info' | 'warning' | 'danger' = 'success';

  constructor(
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {

  }

  onNodeSelect() {

  }
}

