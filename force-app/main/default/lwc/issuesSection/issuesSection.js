import { LightningElement, api, wire, track } from 'lwc';
import IssueDetails from '@salesforce/apex/IssuesDetail.getAffectedItems';
import { NavigationMixin } from 'lightning/navigation';
//export default class RequirementResource extends LightningElement {
    export default class IssuesSection extends NavigationMixin(LightningElement) {
    @api recordId;
    @track results = [];
    @wire(IssueDetails, {recordId:'$recordId'})
     resData({ data, error }) {
        console.log('Enter inside method');
        if (data) {
            this.results = data;
        }
        else if(error) {
            console.error(error);
        }
    }

    viewTabledata1(event) {

        const recordId = event.target.dataset.id;
        console.log('Ids' + recordId);
        console.log("navigation" + recordId);
        this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
        actionName: "view",
        recordId: recordId
    
    
        }
        });
       
        }

        @track expand = true;
        @track collapse = false;

    sectionVisibility() {
        this.expand = false;
        this.collapse = true;
    }

    sectionVisibility2() {
        this.expand = true;
        this.collapse = false;
    }

}