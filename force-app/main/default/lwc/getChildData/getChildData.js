import { LightningElement,api,track} from 'lwc';
import getData from '@salesforce/apex/RelatedOpportunityContact.getData';
const columns1 = [{label : 'Record Id', fieldName : 'Id'},
                  {label : 'Opportunity Name ', fieldName : 'Name'}];

const columns2 = [{label : 'Record ID' , fieldName : 'Id'},
                  {label : 'Contacts Name ', fieldName : 'Name'}]; 

export default class GetChildData extends LightningElement {

    @track columns1 = columns1;
    @track columns2 = columns2; 
    buttonLabel = 'Show';
    showData = false;
    oppData = [];
    ConData = [];
    @api recordId;
    
    
    
    handleClick(event){
        if(event.target.label === 'Show'){
            this.buttonLabel = 'Hide';
            this.showData = true;
        }
        else if(event.target.label === 'Hide'){
            this.buttonLabel = 'Show';
            this.showData = false;
        }
    }

    connectedCallback(){
        getData({accId : this.recordId})
        .then(reponse =>{
            let temRecord = reponse;
            console.log("temRecord==> " ,JSON.stringify(temRecord));

            let temp = temRecord.map(row =>{
                return Object.assign({OppName : row.Opportunities , ConName : row.Contacts})
            });
            console.log('Temp ==> ' , JSON.stringify(temp));
            temp.forEach(element => {
                this.oppData = element.OppName;
                this.ConData = element.ConName;
            });

        })
    }

}