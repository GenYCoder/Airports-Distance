## Airport Distance Measuring Web App

This web application measures the distance of two airports in the United States. It contains all the airports in that country. The data is call through an API on laravel which populates the autocomplete. If the row exists Google Map will plot the two location in a polyline. 

##Installation Guide

1) Install Composer

2) Install VirtualBox & Vagrant (http://laravel.com/docs/4.2/homestead#installation-and-setup)

This video will contain information on how to setup VirtualBox, Vagrant, and Homestead (https://laracasts.com/series/laravel-5-fundamentals/episodes/2)

3) After setting up, map the folder called Moat. If you do not have homestad.yaml file you can run homestead init then run homestead edit to make configurations. It should focus on the folders and sites field. 

4) homestead up

5) Create a database name called Flights and import the mysql file 

6) npm install

7) composer install

6) You should be up and running


##How to use

Type in an airport name in the from input field. An autocomplete should appear giving you suggested airports. After making your selection, type in an airport name for the To input field. This will show the nautical miles plus a polyline on google map. 


