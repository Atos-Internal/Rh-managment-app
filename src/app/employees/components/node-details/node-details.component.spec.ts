import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDetailsComponent } from './node-details.component';

describe('InfoModalComponent', () => {
  let component: NodeDetailsComponent;
  let fixture: ComponentFixture<NodeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NodeDetailsComponent]
    });
    fixture = TestBed.createComponent(NodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
