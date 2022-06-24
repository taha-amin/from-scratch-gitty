const pool = require('../utils/pool');

module.exports = class Post {
  id;
  title;
  content;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.content = row.content;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM posts');
    return rows;
  }
};
