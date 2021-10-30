# firstpick-back

##Running the server

Open a terminal window. Go to wherever you saved the executable cloud_sql_proxy and run the command ** ./cloud_sql_proxy -instances=probable-willow-330020:us-central1:cs-348=tcp:0.0.0.0:4400**.
(i think everybody in this group is using 0.0.0.0 and 4400 lol). This window should say: **Listening on 0.0.0.0:4400 for probable-willow-330020:us-central1:cs-348**
This creates a proxy server aka a VPN to communicate between our database in the cloud and potential clients that want to connect to the server.
You can open your tableplus project at this point.

##Running the client

Open a new terminal window. Go inside your firstpick_back folder and run the command **index node.js** to connect this project, a client, to the proxy server. This window should say: **Now listening on port 5000**,
and the window we used to connect to the server should say: **New connection for "probable-willow-330020:us-central1:cs-348"**
