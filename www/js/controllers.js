app.controller('loginCtrl', function($scope, $rootScope, $stateParams, $state, dbControl, userData) {

	$scope.user = {};

    $scope.login = function(){
			$rootScope.$broadcast('login', {
  				email: $scope.user.email.toLowerCase(),
  				password: $scope.user.password // send whatever you want
			});
    }

    $scope.signup = function(){
    	$state.go('signup')
    }

    $rootScope.$on('login', function(event, user){
    	var readparams = {
    	TableName: 'Account',
		  Key: {
		    email: user.email.toLowerCase()
		  }
		  
		};

		dbControl.readTable(readparams, function(result){
			if(result.Item.password == user.password){
				userData.setEmail(user.email);
				if(result.Item.characterName == null){
					$state.go('createCharacter');
				} else {

					$state.go('currentZone');
				}
			}
		})
    })

    $rootScope.getCurrentZone = function(callback){
               //$cordovaGeolocation
		navigator.geolocation.getCurrentPosition(function(pos){
			var loc = pos;
			var latRounded = Math.abs(Number(Math.round(pos.coords.latitude +'e2'))) % 2; //
			var longRounded = Math.abs(Number(Math.round(pos.coords.longitude +'e2'))) % 2; //
			var min = 1;
			var max = 2;
			//Math.seedrandom(latRounded);
			var zoneIDLat = latRounded
			//Math.seedrandom(longRounded);
			var zoneIDLong = longRounded

			var readparams = {
		    	TableName: 'Zone',
				  Key: {
				    zoneid: zoneIDLat + ',' + zoneIDLong
				  }
			  
			};

			$rootScope.zone = {};
			$rootScope.zone.npcs = [];
			dbControl.readTable(readparams, function(result){
				$rootScope.zone.id = result.zoneid;
				var npcs = result.Item.NPCs.split(',')
				for(var i = 0; i < npcs.length; i++){
					var readparams = {
		    			TableName: 'NPCs',
						Key: {
						  npcid: parseInt(npcs[i])
						}
					}
		  			dbControl.readTable(readparams, function(result){
		  				$rootScope.zone.npcs.push(result.Item);
		  				if($rootScope.zone.npcs.length == npcs.length){
		  					callback();
		  				}
		  			})
				}
				
			})
	 	})
	 }
})

.controller('signupCtrl', function($scope, $rootScope, $stateParams, $state, dbControl) {

	$scope.user = {};

    $scope.signup = function(){
    	var params  = {
    		TableName: 'Account',
		  Item: {
		  	email: $scope.user.email.toLowerCase(),
		    password: $scope.user.password
			}
		  
		};


		dbControl.putItem(params, function(){
			$rootScope.$broadcast('login', {
  				email: $scope.user.email,
  				password: $scope.user.password // send whatever you want
			});
		});
    };
})

.controller('createCharacterCtrl', function($scope, $rootScope, $stateParams, $state, $ionicPopup,dbControl, userData) {

	$scope.characterTypes = ['Human','Beast','Ninja','Goblin'];

	$scope.character = {};

	$scope.character.attack = 10;
	$scope.character.defense = 10;
	$scope.character.speed = 10;
	$scope.character.health = 100;
	$scope.character.skillPoints = 10;

	$scope.openCharacterInfo = function() {
	   var characterInfoPopup = $ionicPopup.alert({
	     title: 'Character Type Info',
	     template: 'Each character type increases certain stats by a fixed percentage.'
	   });

	   characterInfoPopup.then(function(res) {
	     //console.log('Thank you for not eating my delicious ice cream cone');
   		})
   	};

	$scope.addAttack = function(){
		if($scope.character.skillPoints > 0){
			$scope.character.attack++;
			$scope.character.skillPoints--;
		}
	}

	$scope.subAttack = function(){
		if($scope.character.attack > 10){
			$scope.character.attack--;
			$scope.character.skillPoints++;
		}
	}

	$scope.addDefense = function(){
		if($scope.character.skillPoints > 0){
			$scope.character.defense++;
			$scope.character.skillPoints--;
		}
	}

	$scope.subDefense = function(){
		if($scope.character.defense > 10){
			$scope.character.defense--;
			$scope.character.skillPoints++;
		}
	}

	$scope.addSpeed = function(){
		if($scope.character.skillPoints > 0){
			$scope.character.speed++;
			$scope.character.skillPoints--;
		}
	}

	$scope.subSpeed = function(){
		if($scope.character.speed > 10){
			$scope.character.speed--;
			$scope.character.skillPoints++;
		}
	}

	$scope.addHealth = function(){
		if($scope.character.skillPoints > 0){
			$scope.character.health += 10;
			$scope.character.skillPoints--;
		}
	}

	$scope.subHealth = function(){
		if($scope.character.health > 100){
			$scope.character.health -= 10;
			$scope.character.skillPoints++;
		}
	}

    $scope.createCharacter = function(){
    	if($scope.character.skillPoints != 0){
    		return;
    	}

		var params = {
			TableName: 'Character',
			Item: {
				name: $scope.character.name,
			  	level: 1,
			  	type: $scope.character.type,
			    attack: $scope.character.attack,
			    defense: $scope.character.defense,
			    speed: $scope.character.speed,
			    health: $scope.character.health,
			    energy: 100,
			    expierence: 0,
			    quest1: "step:0,count:0"
			}
		}

		dbControl.putItem(params, function(){
			var params = {
				TableName: 'Account',
				Key:{
					email: userData.getEmail()
				},
				AttributeUpdates: {
					characterName: {
		            	Action: 'PUT', 
		                Value: $scope.character.name
		        	}
				}
			}

			dbControl.updateItem(params, function(){
					
			})

			$rootScope.$broadcast('getCurrentZone');
			state.go('currentZone');
		});
    };
})

.controller('currentZoneCtrl', function($scope, $rootScope, $stateParams, $state, dbControl) {
	$scope.people = [];
	$scope.enemies = [];
	
	$rootScope.getCurrentZone(function(){
		$scope.zone = $rootScope.zone;
		$scope.$apply();
	});

	$scope.talk = function(npc){
		$rootScope.selectedNPC = npc;
		state.go('talkNPC');
	}
})

.controller('talkNPCCtrl', function($scope, $rootScope, $stateParams, $state, dbControl) {
	$scope.npc = $rootScope.selectedNPC;
});
