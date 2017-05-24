import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

/*
*   For unit testing. All unit tests for AppComponent to be written here.
*/

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ 
      declarations: [AppComponent], 
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });
  
  it ('should work', () => {
   expect(1+1).toBe(2);
  });
});
