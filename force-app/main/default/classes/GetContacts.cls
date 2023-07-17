public with sharing class GetContacts {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsDetail(String accId){
        try {
            return [Select FirstName,LastName, AccountId, Id from Contact WHERE AccountId =: accId];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}