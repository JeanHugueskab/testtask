// Required package
var request = require('request');
const createCSVFile = require('csv-file-creator');

var i = 0;  // initial value 0 for no of records
var data = [['JOKE']]; // Header of csv file
var jokesArray = []; // array to match if duplicates entry

// Running interval every 5 seconds to hit api
var requestLoop = setInterval(function(){ 
 
    // hitting api get method 
    request({
        url: "https://api.chucknorris.io/jokes/random",
        method: "GET",
        timeout: 10000,
        json: true,
    },function(error, response, body){       
        if(!error){

            var joke_id = body.id;    
            // Checking here for duplicate joke id exists if exists skilled this api call
            if(jokesArray.indexOf(joke_id) !== -1){
                console.log("Joke already exists! skipped")
            } else{

                jokesArray.push(body.id);   
                i++;  // here i is incremented to insert records
                data[i] = [body.value];  // adding record in jokes.csv file
                createCSVFile("jokes.csv", data);
                console.log('No of records inserted : ',i);
                // If records completes to 100 stop execution
                if(i==100){ 
                    console.log('records completed! Now Stopped execution');
                    clearInterval(requestLoop);
                }
            }           
        }else {
            console.log('error while calling request',error) // if api failed to connect or giving response
        }
       
    });
  }, 5000);



