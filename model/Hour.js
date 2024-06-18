const db = require('../config/database');

class Hour {
  constructor(id, userId, date, startTime, endTime) {
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  static create(userId, date, startTime, endTime, callback) {
    const sql = 'INSERT INTO hours (userId, date, startTime, endTime) VALUES (?, ?, ?, ?)';
    db.run(sql, [userId, date, startTime, endTime], function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, new Hour(this.lastID, userId, date, startTime, endTime));
    });
  }

  static findByUserId(userId, callback) {
    const sql = 'SELECT * FROM hours WHERE userId = ?';
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        return callback(err);
      }
      const hours = rows.map(row => new Hour(row.id, row.userId, row.date, row.startTime, row.endTime));
      callback(null, hours);
    });
  }

  static findAll(callback) {
    const sql = 'SELECT * FROM hours';
    db.all(sql, [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      const hours = rows.map(row => new Hour(row.id, row.userId, row.date, row.startTime, row.endTime));
      callback(null, hours);
    });
  }

  static update(id, userId, date, startTime, endTime, callback) {
    const sql = 'UPDATE hours SET userId = ?, date = ?, startTime = ?, endTime = ? WHERE id = ?';
    db.run(sql, [userId, date, startTime, endTime, id], function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, new Hour(id, userId, date, startTime, endTime));
    });
  }

  static delete(id, callback) {
    const sql = 'DELETE FROM hours WHERE id = ?';
    db.run(sql, [id], function(err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  }
}

module.exports = Hour;
