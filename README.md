# run locally

to run the server,
open the terminal in the skyline-robotics-task file directory and run: 
```
npm start
  ```
  
the server will run on 
```
http://localhost:8080/
  ```
  
* use postman to send requests locally
  
open postman 

## Add robots per timestamp request
### POST request

choose POST request and send a request to:
```
http://localhost:8080/
  ```

in raw section, choose JSON and write json like this:
warning: you can send only one by one.
```
{"timestamp": 1658610078, "1123": 177, "9992": -1, "0883": 3}
  ```
## get statistics request
### GET request

choose GET request and send a request to:
```
http://localhost:8080/statistics
  ```
