# poll

A registered user make a poll with answers. User shares the url and guests vote with an input string. User can delete answers by guest string list.

https://www.figma.com/file/CrkNPgxupXR9IG7Y6xoHL2/Poll?type=whiteboard&t=xoCWlfR4waRZpR6N-6

## Code-First
```npx sequelize-cli model:generate --name Answer --attributes title:string,questionId:string```

## To run migration
``` sh ./migrate.sh ```
