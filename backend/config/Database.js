import { Sequelize } from "sequelize";

const db = new Sequelize('crud_notes', 'root', '', {
    host: '34.171.75.159',
    dialect: 'mysql'
});

export default db;