# API FOR MANAGEMENT

# endpoints

POST /api/auth/register {email,password,role?, boss?, subordinates?}  
POST /api/auth/login {email,password}  
GET /api/users with Bearer token obtained via auth, results differ on current role  
Patch /api/users/userId {id:newBossId} to change userId's boss to newBossId, can only be accessed by current boss

# demo

https://management--api.herokuapp.com/  
admin id 1 email@example.com:1234  
regular user id 2 email1@example.com:1234  
boss id 3 email1@example.com:1234
