app.factory('dbControl', function() {
		var ddb = new AWS.DynamoDB.DocumentClient();

        var dbControl = {};

        dbControl.putItem = function(params, callback){
        		ddb.put(params, function(err, data) {
				    if (err) {
				        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
				    } else {
				        console.log("Added item:", JSON.stringify(data, null, 2));
				    }
				    if(typeof callback === 'function'){
    	    			callback(data);
    	    		}
				});
        	};

        dbControl.updateItem = function(params, callback) {
        	    ddb.update(params, function(err, data) {
        			if (err) { return console.log(err); }
    	    		console.log("We updated the table with this: " + data);
    	    		if(typeof callback === 'function'){
    	    			callback();
    	    		}
	    		});
    		};

    	dbControl.readTable = function(readparams, callback) {
            	
        	    ddb.get(readparams, function(err, data) {
			        if (err) { return console.log(err); }
			        	//console.log(": " + data);       

			    	if(typeof callback === 'function'){
    	    			callback(data);
    	    		}// print the item data
			    });
    		};

    	return dbControl;
    })


.factory('userData', function(){
  var user = {};

  user.email = "";

  user.setEmail = function(email){
    user.email = email;
  };

  user.getEmail = function(){
    return user.email;
  };

  return user;
});