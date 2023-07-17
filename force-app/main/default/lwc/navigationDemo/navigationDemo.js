import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavigationDemo extends NavigationMixin(LightningElement) {

    handleClick(){

        // Navigate to Tab
        // this[NavigationMixin.Navigate]({
        //     type : 'standard__navItemPage',
        //     attributes: {
        //         apiName : 'Account_record'
        //     }
        // })


        // Navigate to account tab
        // this[NavigationMixin.Navigate]({
        //     type : 'standard__objectPage',
        //     attributes: {
        //         objectApiName : 'Account',
        //         actionName : 'home'
            
        //     }
        // })

        //Navigate to account Tab in Recent tab
        // this[NavigationMixin.Navigate]({
        //     type : 'standard__objectPage',
        //     attributes: {
        //         objectApiName : 'Account',
        //         actionName : 'list'
        //     },
        //     state : {
        //         filterName : 'Recent'
        //     }
        // })

        // Navigate to account tab in All Account  
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes: {
                objectApiName : 'Account',
                actionName : 'list'
            },
            state : {
                filterName : '00B5i00000AkxHnEAJ'
            }
        })
    }
}