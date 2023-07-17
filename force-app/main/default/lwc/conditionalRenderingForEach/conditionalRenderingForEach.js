import { LightningElement, wire } from 'lwc';
import getAccount from '@salesforce/apex/GetRecords.getAccount';

export default class ConditionalRenderingForEach extends LightningElement {
    /*
    contacts =[
        {
            Id: 1,
            Name: 'Yogesh',
            Title: 'Salesforce Developer'
        },
        {
            Id: 2,
            Name: 'Rahul',
            Title: 'Senior Salesforce Developer'
        },
        {
            Id: 3,
            Name: 'Sid',
            Title: 'CEO'
        }
    ];
    */

    @wire(getAccount)
        contacts;
    
}