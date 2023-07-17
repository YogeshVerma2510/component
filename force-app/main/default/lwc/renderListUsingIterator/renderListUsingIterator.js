import { LightningElement } from 'lwc';

export default class RenderListUsingIterator extends LightningElement {
    contacts = [
        {
            Id :1,
            Name: 'Yogesh Verma',
            Title: 'Associate Salesforce developer'
        },
        {  
            Id :2,
            Name: 'Rahul',
            Title: 'Senior Salesforce developer'
        },
        {
            Id :3,
            Name: 'Sid',
            Title: 'CEO'
        },
    ];
}