## Notes

Run server: `npm start`
Run server in dev mode: `npm run dev`

Ensure IP is added to MongoDB: https://cloud.mongodb.com/v2/658f129f3323a724a2906f95#/overview

Log in/get token:

POST to http://localhost:8000/login/

JSON body:
```
{
    "username": "jacob",
    "password": "password"
}
```