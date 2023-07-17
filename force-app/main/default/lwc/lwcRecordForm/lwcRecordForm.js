import { LightningElement,track } from 'lwc';
import Student_OBJ from '@salesforce/schema/Student__c';
import Student_Name_FIELD from '@salesforce/schema/Student__c.Student_Name__c';
import Email_FIELD from '@salesforce/schema/Student__c.Email_Id__c';
import Course_FIELD from '@salesforce/schema/Student__c.Course__c';

export default class LwcRecordForm extends LightningElement {
    objectapiname = Student_OBJ;
    recordId = 'a005i000009kT7hAAE';
    @track fields = [Student_Name_FIELD,Email_FIELD,Course_FIELD];
}