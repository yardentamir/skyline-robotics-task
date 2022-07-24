# run locally

First, You need to install all the dependencies, to do that run the command below in the terminal:
```
npm install
  ```

To run the server,
open the terminal in the skyline-robotics-task file directory and run the command: 
```
npm start
  ```
  
The server will run on: 
```
http://localhost:8080/
  ```
  
## API

### Add robots per timestamp request

Choose POST request and send a request to:
```
http://localhost:8080/
  ```

Send request body (JSON) like this:
* one timestamp and one or more robot ids with number of alerts
```
{"timestamp": 1658610078, "1123": 177, "9992": -1, "0883": 3}
  ```
Warning: You can only send only one by one.

### get statistics request

Choose GET request and send a request to:
```
http://localhost:8080/statistics
  ```
