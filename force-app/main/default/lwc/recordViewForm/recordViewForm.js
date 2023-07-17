import { LightningElement, api} from 'lwc';
import Student_OBJ from '@salesforce/schema/Student__c';
import StudentName_Field from '@salesforce/schema/Student__c.Student_Name__c';
import Email_Field from '@salesforce/schema/Student__c.Email_Id__c';


export default class RecordViewForm extends LightningElement {
    objectApiName = Student_OBJ;
    @api recordId;
    // @api objectApiName;
    studentName = StudentName_Field;
    Email = Email_Field;
}