const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return users.init(sequelize, DataTypes);
};

/**
 * @openapi
 * components: 
 *   schemas:
 *     register:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: Jamir
 *         email:
 *           type: string
 *           example: jamir@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: jamir@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 *     loginResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           example: 2
 *         username:
 *           type: string
 *           example: jamir
 *         email:
 *           type: string
 *           example: jamir@gmail.com
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInVzZXJuYW1lIjoiSmFtaXIiLCJlbWFpbCI6ImpiYW5jZXM3QGdtYWlsLmNvbSIsImlhdCI6MTY3NTczODc3MSwiZXhwIjoxNjc1NzM5MzcxfQ.JBIMSBLyq4hgoS9PcBfA3FxsaRNLSdbhc7rGZNRfYhoTk2muRAw_8riyxl7R2vx8mYRgYlCU5XlMT-t5EyJag
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

class users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: "users_username_key",
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: "users_email_key",
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        hooks: {
          beforeCreate: (user, options) => {
            const { password } = user;
            const hash = bcrypt.hashSync(password, 10);
            user.password = hash;
          },
        },
        sequelize,
        tableName: "users",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "users_email_key",
            unique: true,
            fields: [{ name: "email" }],
          },
          {
            name: "users_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
          {
            name: "users_username_key",
            unique: true,
            fields: [{ name: "username" }],
          },
        ],
      }
    );
  }
}
