# Supabase Integration Guide

## Overview

This project has been configured to use Supabase as the database backend. Supabase provides a PostgreSQL database with a RESTful API, real-time subscriptions, and built-in authentication.

## Database Connection Details

- **Supabase URL**: `https://nondzwqwgkqxwnxollfw.supabase.co`
- **Publishable Key**: `sb_publishable_lyONRVGCIL3t8Lo1j4rP2w_YgfJAeq4`

## Setup Instructions

### 1. Create Database Tables

1. Go to your Supabase dashboard: https://app.supabase.com/project/nondzwqwgkqxwnxollfw
2. Navigate to the **SQL Editor** in the left sidebar
3. Open the file `supabase-schema.sql` in this project
4. Copy and paste the entire SQL content into the SQL Editor
5. Click **Run** to execute the SQL and create all tables

This will create:
- ✅ `task` table - for task management
- ✅ `finance` table - for financial records
- ✅ `users` table - for user management
- ✅ Sample data in all tables
- ✅ Indexes for performance
- ✅ Row Level Security policies
- ✅ Automatic timestamp updates

### 2. Environment Configuration

Environment variables are already configured in:

**Frontend** (`.env`):
```env
VITE_SUPABASE_URL=https://nondzwqwgkqxwnxollfw.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_lyONRVGCIL3t8Lo1j4rP2w_YgfJAeq4
```

**Backend** (`backend/.env`):
```env
SUPABASE_URL=https://nondzwqwgkqxwnxollfw.supabase.co
SUPABASE_ANON_KEY=sb_publishable_lyONRVGCIL3t8Lo1j4rP2w_YgfJAeq4
```

### 3. Running the Application

**Start Backend:**
```bash
cd backend
npm install
npm start
```

**Start Frontend:**
```bash
npm install
npm run dev
```

## Database Schema

### Task Table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| title | TEXT | Task title |
| status | TEXT | Status: not_started, in_progress, completed |
| due_date | DATE | Due date |
| priority | TEXT | Priority level |
| assigned_to | TEXT | Person assigned |
| description | TEXT | Task description |
| assigned_date | DATE | Date assigned |
| project_name | TEXT | Project name |
| created_at | TIMESTAMP | Auto-generated |
| updated_at | TIMESTAMP | Auto-updated |

### Finance Table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| description | TEXT | Transaction description |
| amount | DECIMAL(10,2) | Amount |
| type | TEXT | Type: income or expense |
| date | DATE | Transaction date |
| project_name | TEXT | Related project |
| due_date | DATE | Payment due date |
| contact_person | TEXT | Contact person |
| contact_person_contact_no | TEXT | Contact number |
| created_at | TIMESTAMP | Auto-generated |
| updated_at | TIMESTAMP | Auto-updated |

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| name | TEXT | User name |
| email | TEXT | Email (unique) |
| mobile | TEXT | Mobile number |
| address | TEXT | Address |
| created_at | TIMESTAMP | Auto-generated |
| updated_at | TIMESTAMP | Auto-updated |

## API Endpoints

All endpoints use the backend server at `http://localhost:5001/api`

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Finance
- `GET /api/finances` - Get all finance records
- `POST /api/finances` - Create a new finance record
- `PUT /api/finances/:id` - Update a finance record
- `DELETE /api/finances/:id` - Delete a finance record

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Health Check
- `GET /api/health` - Check server and database status

## Files Modified

### New Files Created:
1. `src/lib/supabase.ts` - Frontend Supabase client
2. `backend/supabase.js` - Backend Supabase client
3. `supabase-schema.sql` - Database schema SQL
4. `SUPABASE_SETUP.md` - This file

### Modified Files:
1. `.env` - Added Supabase credentials
2. `backend/.env` - Added Supabase credentials
3. `backend/server.js` - Migrated from MySQL to Supabase
4. `package.json` - Added @supabase/supabase-js dependency
5. `backend/package.json` - Added @supabase/supabase-js dependency

## Using Supabase Client Directly (Optional)

If you want to query Supabase directly from the frontend (bypassing the backend API):

```typescript
import { supabase } from '@/lib/supabase';

// Fetch tasks
const { data, error } = await supabase
  .from('task')
  .select('*')
  .order('id', { ascending: false });

// Create task
const { data, error } = await supabase
  .from('task')
  .insert([{ title: 'New Task', status: 'not_started' }])
  .select();

// Update task
const { data, error } = await supabase
  .from('task')
  .update({ status: 'completed' })
  .eq('id', 1);

// Delete task
const { error } = await supabase
  .from('task')
  .delete()
  .eq('id', 1);
```

## Security Notes

⚠️ **Important**: The current RLS policies allow all operations for development purposes. In production, you should:

1. Implement proper authentication
2. Restrict RLS policies based on user roles
3. Use service role keys for backend operations
4. Never expose service role keys in frontend code

## Troubleshooting

### Backend won't start
- Check that `backend/.env` has correct Supabase credentials
- Ensure you've run `npm install` in the backend directory

### Tables not found error
- Make sure you've run the SQL schema in Supabase SQL Editor
- Check that tables exist in Supabase Dashboard > Table Editor

### Connection errors
- Verify your Supabase URL and key are correct
- Check your internet connection
- Ensure Supabase project is active (not paused)

### RLS Policy errors
- The SQL schema includes permissive policies for development
- If you get permission errors, verify RLS policies in Supabase Dashboard

## Next Steps

1. ✅ Create database tables using `supabase-schema.sql`
2. ✅ Start backend server
3. ✅ Start frontend application
4. Test CRUD operations in the UI
5. Customize RLS policies for production
6. Add authentication if needed
7. Deploy backend to Render/Vercel
8. Update frontend API_URL in production

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
