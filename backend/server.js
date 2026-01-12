const express = require('express');
const cors = require('cors');
const { supabase } = require('./supabase');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('task').select('count').limit(1);
    if (error && error.code !== 'PGRST116') { // PGRST116 means table might not exist yet
      throw error;
    }
    console.log('✅ Supabase connected successfully');
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
    console.log('💡 Note: Tables may need to be created in Supabase dashboard');
  }
};

// Initialize database tables (Optional - you should create these in Supabase dashboard)
const initializeTables = async () => {
  console.log('💡 Database tables should be created in Supabase dashboard:');
  console.log('   - task table: id, title, status, due_date, priority, assigned_to, description, assigned_date, project_name');
  console.log('   - finance table: id, description, amount, type, date, project_name, due_date, contact_person, contact_person_contact_no');
  console.log('   - users table: id, name, email, mobile, address, created_at');
};

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const { data, error } = await supabase.from('task').select('count').limit(1);
    res.json({ 
      status: 'ok', 
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        type: 'Supabase (PostgreSQL)',
        connected: !error || error.code === 'PGRST116'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// Task endpoints
app.get('/api/tasks', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('task')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) throw error;
    
    console.log(`📋 Fetched ${data.length} tasks`);
    res.json(data);
  } catch (error) {
    console.error('❌ Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, status, due_date, priority, assigned_to, description, assigned_date, project_name } = req.body;
    
    const { data, error } = await supabase
      .from('task')
      .insert([{
        title,
        status: status || 'not_started',
        due_date,
        priority,
        assigned_to,
        description,
        assigned_date,
        project_name
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    console.log(`✅ Created task: ${title}`);
    res.status(201).json(data);
  } catch (error) {
    console.error('❌ Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { title, status, due_date, priority, assigned_to, description, assigned_date, project_name } = req.body;
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('task')
      .update({
        title,
        status,
        due_date,
        priority,
        assigned_to,
        description,
        assigned_date,
        project_name
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    console.log(`✅ Updated task: ${title}`);
    res.json(data);
  } catch (error) {
    console.error('❌ Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task', details: error.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('task')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    console.log(`✅ Deleted task ID: ${id}`);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
});

// Finance endpoints
app.get('/api/finances', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('finance')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) throw error;
    
    console.log(`💰 Fetched ${data.length} finance records`);
    res.json(data);
  } catch (error) {
    console.error('❌ Error fetching finances:', error);
    res.status(500).json({ error: 'Failed to fetch finances', details: error.message });
  }
});

app.post('/api/finances', async (req, res) => {
  try {
    const { description, amount, type, date, project_name, due_date, contact_person, contact_person_contact_no } = req.body;
    
    const { data, error } = await supabase
      .from('finance')
      .insert([{
        description,
        amount,
        type,
        date,
        project_name,
        due_date,
        contact_person,
        contact_person_contact_no
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    console.log(`✅ Created finance record: ${description}`);
    res.status(201).json(data);
  } catch (error) {
    console.error('❌ Error creating finance record:', error);
    res.status(500).json({ error: 'Failed to create finance record', details: error.message });
  }
});

app.put('/api/finances/:id', async (req, res) => {
  try {
    const { description, amount, type, date, project_name, due_date, contact_person, contact_person_contact_no } = req.body;
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('finance')
      .update({
        description,
        amount,
        type,
        date,
        project_name,
        due_date,
        contact_person,
        contact_person_contact_no
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    console.log(`✅ Updated finance record: ${description}`);
    res.json(data);
  } catch (error) {
    console.error('❌ Error updating finance record:', error);
    res.status(500).json({ error: 'Failed to update finance record', details: error.message });
  }
});

app.delete('/api/finances/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('finance')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    console.log(`✅ Deleted finance record ID: ${id}`);
    res.json({ message: 'Finance record deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting finance record:', error);
    res.status(500).json({ error: 'Failed to delete finance record', details: error.message });
  }
});

// Users endpoints
app.get('/api/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) throw error;
    
    console.log(`👥 Fetched ${data.length} users`);
    res.json(data);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, mobile, address } = req.body;
    
    const { data, error } = await supabase
      .from('users')
      .insert([{
        name,
        email,
        mobile,
        address,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    console.log(`✅ Created user: ${name}`);
    res.status(201).json(data);
  } catch (error) {
    console.error('❌ Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { name, email, mobile, address } = req.body;
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('users')
      .update({
        name,
        email,
        mobile,
        address
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    console.log(`✅ Updated user: ${name}`);
    res.json(data);
  } catch (error) {
    console.error('❌ Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    console.log(`✅ Deleted user ID: ${id}`);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Start server
const startServer = async () => {
  try {
    await testConnection();
    await initializeTables();
    
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 API available at http://localhost:${PORT}/api`);
      console.log(`⏰ Started at: ${new Date().toISOString()}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    
    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('🛑 SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });
    
    process.on('SIGINT', () => {
      console.log('🛑 SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
