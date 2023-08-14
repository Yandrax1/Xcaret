public with sharing class animalsConnectorService {


    public static HttpResponse makeGetCallout() {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        req.setMethod('GET');
        HttpResponse response = http.send(req);

        if(response.getStatusCode() == 200) {
            // Deserializes the JSON string into collections of primitive data types.
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            // Cast the values in the 'animals' key as a list
            List<Object> animals = (List<Object>) results.get('animals');
            List<reddit_items__c> lstReddit = new List<reddit_items__c>();

            for(Object animal: animals) {
                reddit_items__c redditItem = new reddit_items__c();
                redditItem.title__c = String.valueOf(animal);
                redditItem.author_fullname__c = 'Luis Dorantes';
                redditItem.thumbnail__c = String.valueOf(animal);
                redditItem.selftext__c = 'Luis Dorantes';
                lstReddit.add(redditItem);
            }
            if (lstReddit.size()>0) {
                insert lstReddit;
            }
        }

        return response;   
    }    
    
}