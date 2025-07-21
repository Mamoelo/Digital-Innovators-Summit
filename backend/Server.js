//Server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./Backend');
const path = require('path');
const fs = require('fs');

const logStream = fs.createWriteStream('app.log', { flags: 'a' });
console.log = (...args) => logStream.write(`[LOG] ${args.join(' ')}\n`);
console.error = (...args) => logStream.write(`[ERROR] ${args.join(' ')}\n`);

const app = express();
// const api = express.Router();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'https://dislesotho.com'
}));
app.use(bodyParser.json());
const FRONTEND_PATH = path.join(__dirname, '..', 'admin');

app.use(express.static(FRONTEND_PATH));
console.log('Frontend path:', FRONTEND_PATH);

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Input validation
    if (!username || !password) {
        return res.status(400).json({
        error: 'MISSING_FIELDS',
        message: 'Username and password are required' 
        });
    }

  try {
    // 1. Get admin by username
    const admin = await db.getAdminByUsername(username);
    
    if (!admin) {
      return res.status(401).json({
        error: 'INVALID_USERNAME',
        message: 'Username not found' 
      });
    }
    
    // 2. Check account status
    if (admin.status !== 'active') {
      return res.status(401).json({
        error: 'ACCOUNT_INACTIVE',
        message: 'Account is not active. Contact administrator.'
      });
    }

    // 3. Compare passwords
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);
    
    if (!passwordMatch) {
      return res.status(401).json({
        error: 'INVALID_PASSWORD',
        message: 'Incorrect password' 
      });
    }
    
    // 4. Create JWT token
    const token = jwt.sign(
      { adminId: admin.admin_id, roleId: admin.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // 5. Update last login time
    db.updateLastLogin(admin.admin_id);
    const roleRow = await db.getAdminRole(admin.role_id);
    
    // 6. Send response
    res.json({
      message: 'Login successful',
      token,
      adminId: admin.admin_id,
      username: admin.username,
      role: {
        id:            roleRow.role_id,
        name:          roleRow.role_name,
        canAdd:        !!roleRow.can_add_content,
        canRemove:     !!roleRow.can_remove_content,
        canStartStream:!!roleRow.can_start_stream,
        canSchedule:   !!roleRow.can_set_schedule,
        canManageUsers:!!roleRow.can_manage_users
      }
    });
    
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'SERVER_ERROR',
      message: 'Internal server error' 
    });
  }
});

// Protected route example
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the dashboard', adminId: req.admin.adminId, roleId: req.admin.roleId });
});

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ 
        error: 'INVALID_TOKEN',
        message: 'Session expired. Please login again.'
      });
      req.admin = { adminId: decoded.adminId, roleId: decoded.roleId };
      next();
    }
  );
}

// Admin Routes
app.post('/admins', async (req, res) => {
  try {
    const { username, password_hash, email, full_name, role_id } = req.body;
    db.addAdmin(username, password_hash, email, full_name, role_id);
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/admins/:username', async (req, res) => {
  try {
    const admin = await db.getAdminByUsername(req.params.username);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Folder Routes
app.post('/folders', async (req, res) => {
  try {
    const { folder_name, path, extension_id, created_by } = req.body;
    db.createFolder(folder_name, path, extension_id, created_by);
    res.status(201).json({ message: 'Folder created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Media Routes
app.post('/images', async (req, res) => {
  try {
    const { image_name, description, file_path, folder_id, uploaded_by } = req.body;
    db.addImage(image_name, description, file_path, folder_id, uploaded_by);
    res.status(201).json({ message: 'Image added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/videos', async (req, res) => {
  try {
    const { video_name, description, file_path, folder_id, type_id, duration, uploaded_by } = req.body;
    db.addVideo(video_name, description, file_path, folder_id, type_id, duration, uploaded_by);
    res.status(201).json({ message: 'Video added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// News Routes
app.post('/news', async (req, res) => {
  try {
    const { topic, detail_id, publish_time, is_breaking, created_by } = req.body;
    db.addNews(topic, detail_id, publish_time, is_breaking, created_by);
    res.status(201).json({ message: 'News added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/news/:id', async (req, res) => {
  try {
    const news_id = req.params.id;
    const { topic, is_breaking } = req.body;
    db.updateNews(news_id, topic, is_breaking);
    res.json({ message: 'News updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Partner Routes
app.post('/partners', async (req, res) => {
  try {
    const { partner_name, type_id, description, contact_email, contact_phone, website_url, logo_image_id, created_by } = req.body;
    db.addPartner(partner_name, type_id, description, contact_email, contact_phone, website_url, logo_image_id, created_by);
    res.status(201).json({ message: 'Partner added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stream Routes
app.post('/streams', async (req, res) => {
  try {
    const { stream_title, description, scheduled_start, created_by } = req.body;
    db.startStream(stream_title, description, scheduled_start, created_by);
    res.status(201).json({ message: 'Stream scheduled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Relationship Routes
app.post('/news/images', async (req, res) => {
  try {
    const { news_id, image_id, display_order } = req.body;
    db.linkNewsImage(news_id, image_id, display_order);
    res.status(201).json({ message: 'Image linked to news successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.use('/api', api);

// Serve frontend
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, 'index.html'));
});
console.log('Index.html path:', path.join(FRONTEND_PATH, 'index.html'));

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving frontend from: ${FRONTEND_PATH}`);
});