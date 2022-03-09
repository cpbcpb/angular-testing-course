import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import { DebugElement, Component } from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import { Course } from '../model/course';
import {setupCourses} from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {
  
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;  // a utility type with a lot of methods that are useful
  let el: DebugElement;

  beforeEach(waitForAsync(() => {  // waitForAsync
    // the angular.io suggests breaking this into 2 parts, sync and async, but teacher likes this way better.
    TestBed.configureTestingModule({
      // in the case of presentational component, usually only need declarations.
      imports: [ CoursesModule ]
      // nothing on the CoursesModule would stop the tests from running, unlike the app.module which
      // has the browser module etc.
    })
    .compileComponents() // compiling angular components is asynchronous, can involve calling for stylesheets stored externally etc.
    .then(() => {
      fixture = TestBed.createComponent(CoursesCardListComponent);
  
      component = fixture.componentInstance;

      el = fixture.debugElement;
      
    });
  }) );

  it("should create the component", () => {

    expect(component).toBeTruthy();

    console.log(component);

  });


  it("should display the course list", () => {  // this is a purely synchronous test, which is easier to read and maintain.  

    component.courses = setupCourses();  // after this, need to trigger change detection on the component

    fixture.detectChanges();

    console.log(el.nativeElement.outerHTML);


    const cards = el.queryAll(By.css(".course-card"));
    expect(cards).toBeTruthy("Could not find cards");
    expect(cards.length).toBe(12, "Unexpected number of courses");

  });


  it("should display the first course", () => {

      component.courses = setupCourses();
      fixture.detectChanges();

      const course = component.courses[0];
      const card = el.query(By.css(".course-card:first-child")),
            title = card.query(By.css("mat-card-title")),
            image = card.query(By.css("img"));
  
      expect(card).toBeTruthy("Could not find course card");
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);

  });


});


