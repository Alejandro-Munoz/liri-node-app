# liri-node-app

## What is it?
LIRI is like iPhone's SIRI. 
However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.



The application responds to 3 commands:

	* my-tweets
	* spotify-this-song
	* movie-this

Refer to the [**Show Me**](#show-me) section below for examples on how to use each of the views.

## How do I use it?

Clone this repository and then run:

`npm install`

Then, to run the applicaton run:

`node liri [command + value Ex. movie-this Frozen]`

## Show Me

After executing `node liri command + value`, depending on command you will be presented with a list of items relative of command + value.

![node_liri](images/for_readme/node_liri.png)

## Movie-this Command

When the Movie-this command is executed, you will be presented with information about the movie passed in as value.

![customer enter id](images/for_readme/liri_movie_this.png)

## My-tweets Command

The Manager View provides you with the following choices.

![manager choices](images/for_readme/manager_choices.png)


## Spotify-this-song Command

The Supervisor view allows you the following options.

![supervisor choices](images/for_readme/supervisor_choices.png)


