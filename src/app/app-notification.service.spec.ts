import { TestBed, inject } from '@angular/core/testing';

import { AppNotificationService } from './app-notification.service';

describe('AppNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppNotificationService]
    });
  });

  it('should be created', inject([AppNotificationService], (service: AppNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
