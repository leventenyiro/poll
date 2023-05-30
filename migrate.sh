npx sequelize model:generate --name User --attributes "name:string,email:string,password:string"

npx sequelize-cli migration:generate --name initialize_database
npx sequelize-cli db:migrate
npx sequelize db:migrate # ezzel lehet migrations-t csinálni