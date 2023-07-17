import { LightningElement, api, wire } from 'lwc';
import getContact from '@salesforce/apex/GetContacts.getContactsDetail';

export default class GetContacts extends LightningElement {
    @api recordId;
    @wire(getContact,{accId : '$recordId'})
    contacts;
}