import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Student_OBJ from '@salesforce/schema/Student__c';
import StudentName_FIELD from '@salesforce/schema/Student__c.Student_Name__c';
import Email_FIELD from '@salesforce/schema/Student__c.Email_Id__c';
import Batch_FIELD from '@salesforce/schema/Student__c.Batch__c';
import Course_FIELD from '@salesforce/schema/Student__c.Course__c';

export default class RecordEdit extends LightningElement {

    objectapiname = Student_OBJ;
    StudentName = StudentName_FIELD;
    Email = Email_FIELD;
    batch = Batch_FIELD;
    course = Course_FIELD;
    studentId = 'Student Id will display  here'

    handleSuccess(event){
        this.studentId = event.detail.id;
        const events = new ShowToastEvent({
            title : this.studentId,
            message : 'Student Created Successfully',
            variant : 'success' 
        });
        this.dispatchEvent(events);
    }


}