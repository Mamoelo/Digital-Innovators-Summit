//Backend.js
const mysql = require('mysql2');
require('dotenv').config();

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'dislyffo_KevinMk',
  password: '24e4fcb6$MK1!q',
  database: 'dislyffo_dis_lesotho'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to CMS database');
});

// Admin Functions
const addAdmin = (username, password_hash, email, full_name, role_id) => {
  const stmt = db.prepare(
    `INSERT INTO admins (username, password_hash, email, full_name, role_id) 
     VALUES (?, ?, ?, ?, ?)`
  );
  stmt.execute([username, password_hash, email, full_name, role_id]);
};

const getAdminByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query(
        `SELECT admin_id, username, password_hash, role_id, status
        FROM admins 
        WHERE username = ?`,
        [username],
        (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
};

const getAdminRole =(role_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT 
         role_id,
         role_name,
         can_add_content,
         can_remove_content,
         can_start_stream,
         can_set_schedule,
         can_manage_users
       FROM admin_roles
       WHERE role_id = ?`,
      [role_id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // returns the first (and only) matching role
      }
    );
  });
};

// Update last login time
const updateLastLogin = (adminId) => {
  db.query(
    `UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE admin_id = ?`,
    [adminId],
    (err, result) => {
      if (err) {
        console.error('Update login failed:', err);
      }
    }
  );
};

// Folder Functions
const createFolder = (folder_name, path, extension_id, created_by) => {
  const stmt = db.prepare(
    `INSERT INTO folders (folder_name, path, extension_id, created_by) 
     VALUES (?, ?, ?, ?)`
  );
  stmt.execute([folder_name, path, extension_id, created_by]);
};

// Media Functions
const addImage = (image_name, description, file_path, folder_id, uploaded_by) => {
  const stmt = db.prepare(
    `INSERT INTO images (image_name, description, file_path, folder_id, uploaded_by) 
     VALUES (?, ?, ?, ?, ?)`
  );
  stmt.execute([image_name, description, file_path, folder_id, uploaded_by]);
};

const addVideo = (video_name, description, file_path, folder_id, type_id, duration, uploaded_by) => {
  const stmt = db.query(
    `INSERT INTO videos (video_name, description, file_path, folder_id, type_id, duration, uploaded_by) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  stmt.execute([video_name, description, file_path, folder_id, type_id, duration, uploaded_by]);
};

// News Functions
const addNews = (topic, detail_id, publish_time, is_breaking, created_by) => {
  const stmt = db.query(
    `INSERT INTO news (topic, detail_id, publish_time, is_breaking, created_by) 
     VALUES (?, ?, ?, ?, ?)`
  );
  stmt.execute([topic, detail_id, publish_time, is_breaking, created_by]);
};

// Partner Functions
const addPartner = (partner_name, type_id, description, contact_email, contact_phone, website_url, logo_image_id, created_by) => {
  const stmt = db.query(
    `INSERT INTO partners (partner_name, type_id, description, contact_email, contact_phone, website_url, logo_image_id, created_by) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  stmt.execute([partner_name, type_id, description, contact_email, contact_phone, website_url, logo_image_id, created_by]);
};

// Stream Functions
const startStream = (stream_title, description, scheduled_start, created_by) => {
  const stmt = db.query(
    `INSERT INTO streams (stream_title, description, scheduled_start, created_by) 
     VALUES (?, ?, ?, ?)`
  );
  stmt.execute([stream_title, description, scheduled_start, created_by]);
};

// Update Functions
const updateAdminStatus = (admin_id, status) => {
  const stmt = db.query(
    `UPDATE admins SET status = ? WHERE admin_id = ?`
  );
  stmt.execute([status, admin_id]);
};

const updateNews = (news_id, topic, is_breaking) => {
  const stmt = db.query(
    `UPDATE news SET topic = ?, is_breaking = ? WHERE news_id = ?`
  );
  stmt.execute([topic, is_breaking, news_id]);
};

// Delete Functions
const deleteAdmin = (admin_id) => {
  const stmt = db.query(
    `UPDATE admins SET status = 'deleted' WHERE admin_id = ?`
  );
  stmt.execute([admin_id]);
};

const removeNews = (news_id) => {
  const stmt = db.query(
    `DELETE FROM news WHERE news_id = ?`
  );
  stmt.execute([news_id]);
};

// Relationship Management
const linkNewsImage = (news_id, image_id, display_order = 0) => {
  const stmt = db.query(
    `INSERT INTO news_images (news_id, image_id, display_order) 
     VALUES (?, ?, ?)`
  );
  stmt.execute([news_id, image_id, display_order]);
};

// Export all functions
module.exports = {
  addAdmin,
  getAdminByUsername,
  getAdminRole,
  updateLastLogin,
  createFolder,
  addImage,
  addVideo,
  addNews,
  addPartner,
  startStream,
  updateAdminStatus,
  updateNews,
  deleteAdmin,
  removeNews,
  linkNewsImage
};