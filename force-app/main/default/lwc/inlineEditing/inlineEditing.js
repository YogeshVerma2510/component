import { LightningElement,track,wire} from 'lwc';
import getStudent from '@salesforce/apex/StudentData.getStudent';


const columns = [{label : 'Student Name ', fieldName : 'Student_Name__c', editable:true},
                {label : 'Contact Name ', fieldName : 'Phone_No__c', editable:true},
                {label : 'Fees', fieldName : 'Fee__c', editable:true}
                ];


export default class InlineEditing extends LightningElement {
    columns = columns;
    data = [];
    draftvalues = [];


    @wire(getStudent)
    studentData({data,error}){
        if(data){
            this.data = data;
            console.log("Data From wire =>" +JSON.stringify(this.data));

        }
        else if(error){
            console.log("Error from wire method=> " + JSON.stringify(error));
        }
    }

    /*
    handleSave(event){
        const updateFieldValues = event.detail.draftvalues;
        console.log("updated Values => "+ JSON.stringify(updateFieldValues));

    }
    */

    handleSave(event){
        const updatedFieldValues = event.detail.draftvalues;
        console.log("Updated values => "+ JSON.stringify(updatedFieldValues));
    }
    
    
}