//import modules
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
//get keys
var keys = require("./keys.js");

//twitter keys
var consumerKey = keys.twitterKeys.consumer_key;
var consumerSecret = keys.twitterKeys.consumer_secret;
var accessKey = keys.twitterKeys.access_token_key;
var accessSecret = keys.twitterKeys.access_token_secret;
//spotify keys
var clientId = keys.spotifyKeys.clientId;
var clientSecret = keys.spotifyKeys.clientSecret;

//twitter setup
var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessKey,
  access_token_secret: accessSecret
});

//spotify setup
var spotify = new Spotify({
  id: clientId,
  secret: clientSecret
});


//get command action from user input
var command = process.argv[2];
var item = process.argv[3] || "";

//function to log actions on text file
function log(command,item){
	fs.appendFile('log.txt', command+":" + item + "\n", (err) => {
	  if (err) throw err;
	  console.log('Action has been logged!');
	});
}

//function wrapper for all commands
function doSomething(command,item){
	switch(command){
		case "my-tweets":
			console.log("my-tweets");
			var params = {screen_name: 'Alejandro_Liri'};
			client.get('statuses/user_timeline', params, function(error, tweets, response) {
			  if (!error) {
			  	console.log("=================================================");
			  	console.log("=================================================");
			    tweets.forEach(function(el){
			    	
			    	console.log("Creation Date: " + el.created_at);
			    	console.log("Tweet text: " + el.text);
			    	console.log("....................");
			    });
			  	console.log("=================================================");
			  	console.log("=================================================");
			    
			  }
			});

			break;
		case "spotify-this-song":
			console.log("spotify-this-song");
			var artist = "";
			var song = "";
			var preview = "";
			var album = "";

			//If no song provided, set default
			item = item || "The sign - Ace of Base";
			spotify.search({ type: 'track', query: item }, function(err, data) {
				if (err) {
					console.log('Error occurred: ' + err);
					return;
				} 

				data.tracks.items.forEach(function(obj){
					artist = obj.artists[0].name;
					song = obj.name;
					preview = obj.external_urls.spotify;
					album = obj.album.name;
					console.log("=================================================");
				  	console.log("=================================================");
					console.log("Artist: ", artist);
					console.log("Song: ", song);
					console.log("Preview: ", preview);
					console.log("Album: ", album);
				
				});
			});

			break;
		case "movie-this":
			item = item || 'Mr. Nobody';
			request('http://www.omdbapi.com/?t=' + item + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
			  if (error) throw error;
			  var obj = JSON.parse(body);
			  console.log("=================================================");
			  console.log("=================================================");
			  console.log("Title: ", obj.Title);
			  console.log("Year: ", obj.Year);
			  console.log("IMDB Rating: ", obj.imdbRating);
			  console.log("Rotten Tomatoes Rating: ", obj.Ratings[1].Value);
			  console.log("Country: ", obj.Country);
			  console.log("Language: ", obj.Language);
			  console.log("Plot: ", obj.Plot);
			  console.log("Actors: ", obj.Actors); // Print the HTML for the Google homepage.
			  console.log("=================================================");
			  console.log("=================================================");
			});

			break;
		case "do-what-it-says":
			console.log("do-what-it-says");
			var args;
			var cmd;
			var el;

			fs.readFile('./random.txt','utf8',function(err,data){
				if(err) throw err;
				 args = data.split(",");
				 cmd = args[0];	
				 el = args[1];	
				// console.log(data);
				doSomething(cmd,el);
			})
			
			break;
		default:
			console.log("No command provided");
			
			break;
	}
}
log(command,item);
doSomething(command,item);