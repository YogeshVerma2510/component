import { LightningElement,api, wire } from 'lwc';
import { getRecord ,getFieldValue} from 'lightning/uiRecordApi';
// import Account from '@salesforce/schema/Account';
import NAME_FILED from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

export default class WireDemo extends LightningElement {

    @api recordId;
    @wire(getRecord,{recordId : '$recordId', fields :[NAME_FILED,PHONE_FIELD]})
        record; // data or error
    
    get name(){
        return this.record.data ? getFieldValue(this.record.data, NAME_FILED) : '';
        // return this.record.data.fields.Name.value;
    }
    get phone(){
        return this.record.data ? getFieldValue(this.record.data, PHONE_FIELD) : '';
        // return this.record.data.fields.Phone.value;
    }

}