# article-on-koa
The little test api for create articles by user

## Setup API
for first create your own .env file, look at env.example
for start API you need make sure you run Mongo on your local machine , go to the api directory and write this command
```
$ npm install
```
```
$ npm run start 
```

## HOW TO USE

#### CREATE USER
```
POST: http://localhost:3000/users
```
InsertDataExample(in body):  
```
{
    "name": "Jhon",
    "surname": "Doe",
    "email": "jhon.doe@gmail.com",
    "password": "password1"
}
```

ReturnExample:

```
{
    "data": {
        "uuid": "e62eba3f-5b51-4a45-9d65-922acfc5c0a1",
        "name": "Jhon",
        "surname": "Doe",
        "email": "jhon.doe@gmail.com",
        "createdAt": "2020-08-16T11:39:01.572Z"
    }
}
```

#### DELETE USER BY UUID
```
DELETE: http://localhost:3000/users/:uuid
```

## LOGIN

#### LOGIN USER
```
POST: http://localhost:3000/api/auth
```

InsertDataExample(in body):  
```
{
    "email": "jhon.doe@gmail.com",
    "password": "password1"
}
```
ReturnExample:

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTc1NzcwMjEsImV4cCI6MTU5NzU3NzYyMX0.LVi7ZA9Ffr-MujWWfg-99_yZPvPspxCcGOqPC9Gf9z0",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTc1NzcwMjEsImV4cCI6MTU5NzY2MzQyMX0.5FDf3CfHL9uC01Vz-G4dBgj-lo8X9hYysdKaU8WtbsY"
}
```

#### LOGOUT
```
POST: http://localhost:3000/api/auth/logout
```

```
HEADER: Authorization: <your access-token>
```

## ARTICLES

#### CREATE ARTICLE
```
POST: http://localhost:3000/api/article
```

```
HEADER: Authorization: <your access-token>
```
InsertDataExample(in body):  
```
{
    "title": "My First Article",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum eu ipsum nec fringilla. Integer ultrices ullamcorper nisi pulvinar ullamcorper. Vestibulum dignissim vestibulum augue, eu mattis diam. Fusce a vehicula leo, non imperdiet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies velit quam, eget commodo dui consequat ut. Pellentesque aliquam aliquet justo aliquet gravida. Integer gravida est sed urna fringilla, vitae commodo ipsum pharetra. Vestibulum pharetra maximus neque sit amet volutpat. Nulla faucibus pretium cursus. Nunc tempor volutpat molestie. Vestibulum eget convallis quam. Aliquam sagittis velit ut pellentesque vestibulum. Fusce bibendum neque in enim maximus ultricies."
}
```

ReturnExample:

```
{
    "data": {
        "uuid": "c56ea842-139e-4b8d-8896-de8326d8ae34",
        "title": "My First Article",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum eu ipsum nec fringilla. Integer ultrices ullamcorper nisi pulvinar ullamcorper. Vestibulum dignissim vestibulum augue, eu mattis diam. Fusce a vehicula leo, non imperdiet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies velit quam, eget commodo dui consequat ut. Pellentesque aliquam aliquet justo aliquet gravida. Integer gravida est sed urna fringilla, vitae commodo ipsum pharetra. Vestibulum pharetra maximus neque sit amet volutpat. Nulla faucibus pretium cursus. Nunc tempor volutpat molestie. Vestibulum eget convallis quam. Aliquam sagittis velit ut pellentesque vestibulum. Fusce bibendum neque in enim maximus ultricies."
    }
}
```


#### GET ALL ARTCILES
```
http://localhost:3000/api/article?limit=20&offset=0
```

ReturnExample:
```
{
    "data": {
        "articles": [
            {
                "_id": "5f3917488e2ad110276eba2b",
                "title": "My first article",
                "text": "asddddddddddddddddddddddddddddddddgfsgsdhsdgsfgsdfgdsfg",
                "uuid": "3c88817a-2b50-48b2-91a5-606e0b899715",
                "authorUuid": "bc28f198-e12f-46d2-b294-d63b39989104",
                "__v": 0
            },
            {
                "_id": "5f3917a98e2ad110276eba2c",
                "title": "JavaScript",
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum eu ipsum nec fringilla. Integer ultrices ullamcorper nisi pulvinar ullamcorper. Vestibulum dignissim vestibulum augue, eu mattis diam. Fusce a vehicula leo, non imperdiet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies velit quam, eget commodo dui consequat ut. Pellentesque aliquam aliquet justo aliquet gravida. Integer gravida est sed urna fringilla, vitae commodo ipsum pharetra. Vestibulum pharetra maximus neque sit amet volutpat. Nulla faucibus pretium cursus. Nunc tempor volutpat molestie. Vestibulum eget convallis quam. Aliquam sagittis velit ut pellentesque vestibulum. Fusce bibendum neque in enim maximus ultricies.",
                "uuid": "3602ef33-47af-44cb-a3a7-df040f6b88e3",
                "authorUuid": "bc28f198-e12f-46d2-b294-d63b39989104",
                "__v": 0
            }
        ],
        "count": 2,
        "pageCount": 1
    }
}
```

#### GET ARTICLE BY UUID
```
GET: http://localhost:3000/api/article/:articleUuid
```

ReturnExample:
```
{
    "data": {
        "_id": "5f3917a98e2ad110276eba2c",
        "title": "JavaScript",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum eu ipsum nec fringilla. Integer ultrices ullamcorper nisi pulvinar ullamcorper. Vestibulum dignissim vestibulum augue, eu mattis diam. Fusce a vehicula leo, non imperdiet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies velit quam, eget commodo dui consequat ut. Pellentesque aliquam aliquet justo aliquet gravida. Integer gravida est sed urna fringilla, vitae commodo ipsum pharetra. Vestibulum pharetra maximus neque sit amet volutpat. Nulla faucibus pretium cursus. Nunc tempor volutpat molestie. Vestibulum eget convallis quam. Aliquam sagittis velit ut pellentesque vestibulum. Fusce bibendum neque in enim maximus ultricies.",
        "uuid": "3602ef33-47af-44cb-a3a7-df040f6b88e3",
        "authorUuid": "bc28f198-e12f-46d2-b294-d63b39989104",
        "__v": 0
    }
}
```
#### UPDATE ARTICLE BY UUID
```
PATCH: http://localhost:3000/api/article/:articleUuid
```

```
HEADER: Authorization: <your access-token>
```

UpdateDataExample:
```
{
    "title": "My third article",
    "text": "some text"
}
```
You can update one or more parameters

ReturnExample:
```
{
    "data": {
        "_id": "5f3917b08e2ad110276eba2d",
        "title": "My third article",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum eu ipsum nec fringilla. Integer ultrices ullamcorper nisi pulvinar ullamcorper. Vestibulum dignissim vestibulum augue, eu mattis diam. Fusce a vehicula leo, non imperdiet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies velit quam, eget commodo dui consequat ut. Pellentesque aliquam aliquet justo aliquet gravida. Integer gravida est sed urna fringilla, vitae commodo ipsum pharetra. Vestibulum pharetra maximus neque sit amet volutpat. Nulla faucibus pretium cursus. Nunc tempor volutpat molestie. Vestibulum eget convallis quam. Aliquam sagittis velit ut pellentesque vestibulum. Fusce bibendum neque in enim maximus ultricies.",
        "uuid": "c56ea842-139e-4b8d-8896-de8326d8ae34",
        "authorUuid": "bc28f198-e12f-46d2-b294-d63b39989104",
        "__v": 0
    }
}
```

#### DELETE ARTICLE BY UUID

```
DELETE: http://localhost:3000/api/article/:articleUuid
```

```
HEADER: Authorization: <your access-token>
```
