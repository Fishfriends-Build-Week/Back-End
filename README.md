# Back-End

## API URI

[https://fish-friends-build-week.herokuapp.com/](https://fish-friends-build-week.herokuapp.com/)

## Endpoints

| Method | Path               | Description | Note |
|--------|--------------------|-------------|------|
| GET    | /accounts/         | retrieves list of existing users | |
| POST   | /accounts/register | to create a user | takes username/password -- for now |
| POST   | /accounts/login    | to login a user | takes username/password -- for now |
| GET    | /locations         | displays locations | this route requires token in "authorization" in header |
| GET    | /locations/:id     | displays location with specified id | this route requires token in "authorization" in header |
| POST   | /locations         | adds new location | route requires token in "authorization" in header |
| PUT    | /locations/:id     | id as route param and new log as body of request. | can only update location_name |
| DELETE | /locations/:id     | log id as route param | |
| GET    | /bait              | displays bait | this route requires token in "authorization" in header |
| GET    | /bait/:id          | displays bait with specified id | this route requires token in "authorization" in header |
| POST   | /bait              | adds new bait | route requires token in "authorization" in header |
| PUT    | /bait/:id          | id as route param and new log as body of request. | can only update bait_name |
| DELETE | /bait/:id          | log id as route param | |
| GET    | /fish              | displays fish | this route requires token in "authorization" in header |
| GET    | /fish/:id          | displays fish with specified id | this route requires token in "authorization" in header |
| POST   | /fish              | adds new fish | route requires token in "authorization" in header |
| PUT    | /fish/:id          | id as route param and new log as body of request. | can only update fish name |
| DELETE | /fish/:id          | log id as route param | |
| GET    | /logs              | displays logs | this route requires token in "authorization" in header |
| GET    | /logs/:id          | displays log with specified id | this route requires token in "authorization" in header |
| POST   | /logs              | adds new log | route requires token in "authorization" in header |
| PUT    | /logs/:id          | id as route param and new log as body of request. | can only update location_id, log time_spent |
| DELETE | /logs/:id          | log id as route param | |
| GET    | /logs/search       | searches for and returns array of existing logs based on query | text passed into body |
| GET    | /logs/:id/bait     | retrieves all bait used in a log by the log id passed into the route params | |
| GET    | /logs/:id/fish     | retrieves all fish used in a log by the log id passed into the route params | |
