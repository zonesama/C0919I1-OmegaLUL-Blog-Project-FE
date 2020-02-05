import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLoginFirstTimeComponent } from './social-login-first-time.component';

describe('SocialLoginFirstTimeComponent', () => {
  let component: SocialLoginFirstTimeComponent;
  let fixture: ComponentFixture<SocialLoginFirstTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialLoginFirstTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLoginFirstTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
