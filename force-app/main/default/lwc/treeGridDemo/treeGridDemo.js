import { LightningElement, track } from 'lwc';
import getData from '@salesforce/apex/TreeGrid.getData';

export default class TreeGridDemo extends LightningElement {
    @track gridColumns = [{
        type : 'text',
        fieldName : 'Name',
        label : 'Name'
    },
    {
        type : 'text',
        fieldName : 'FirstName',
        label : 'First Name'
    },
    {
        type : 'text',
        fieldName : 'LastName',
        label : 'Last Name'
    }
    ];

    @track gridData;

    connectedCallback(){
        getData()
        .then(response =>{
            //console.log("Response ==> " , JSON.stringify(response));

            var tempContact = JSON.parse(JSON.stringify(response));
            console.log('tempContact ==> ' + JSON.stringify(tempContact));

            for(var i=0; i<tempContact.length; i++){
                var newContact = tempContact[i]['Contacts'];
                console.log('newContact =>' + JSON.stringify(newContact));
                
                if(newContact){
                    tempContact[i]._children = newContact;
                }
            }
            this.gridData = tempContact;

        })
        .catch(error =>{
            console.error(JSON.stringify(error));
        })
    }




    onrowSelection(event){
        this.selectedRow = event.detail.selectedRow;
        console.log("selectedRow ==> "+ this.selectedRow);


    }
     

}