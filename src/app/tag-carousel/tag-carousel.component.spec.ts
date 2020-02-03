import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCarouselComponent } from './tag-carousel.component';

describe('TagCarouselComponent', () => {
  let component: TagCarouselComponent;
  let fixture: ComponentFixture<TagCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
