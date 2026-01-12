-- Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Create task table
CREATE TABLE IF NOT EXISTS task (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  due_date DATE,
  priority TEXT,
  assigned_to TEXT,
  description TEXT,
  assigned_date DATE,
  project_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create finance table
CREATE TABLE IF NOT EXISTS finance (
  id BIGSERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  date DATE,
  project_name TEXT,
  due_date DATE,
  contact_person TEXT,
  contact_person_contact_no TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mobile TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_task_status ON task(status);
CREATE INDEX IF NOT EXISTS idx_task_due_date ON task(due_date);
CREATE INDEX IF NOT EXISTS idx_finance_type ON finance(type);
CREATE INDEX IF NOT EXISTS idx_finance_date ON finance(date);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert sample data for tasks
INSERT INTO task (title, status, due_date, priority, assigned_to, description, assigned_date, project_name)
VALUES 
  ('Complete project documentation', 'in_progress', '2024-02-15', '3', 'John Doe', 'Write comprehensive docs', '2024-02-01', 'Project Alpha'),
  ('Review code changes', 'not_started', '2024-02-10', '2', 'Jane Smith', 'Review PR #123', '2024-02-03', 'Project Beta'),
  ('Deploy to production', 'completed', '2024-02-05', '1', 'Mike Johnson', 'Deploy v1.0', '2024-02-01', 'Project Alpha'),
  ('Update user interface', 'not_started', '2024-02-20', '4', 'Sarah Wilson', 'Redesign dashboard', '2024-02-05', 'Project Gamma')
ON CONFLICT DO NOTHING;

-- Insert sample data for finance
INSERT INTO finance (description, amount, type, date, project_name, contact_person)
VALUES 
  ('Salary payment', 5000.00, 'income', '2024-02-01', 'Project Alpha', 'HR Department'),
  ('Office rent', 1200.00, 'expense', '2024-02-01', 'General', 'Landlord'),
  ('Freelance project', 1500.00, 'income', '2024-02-05', 'Project Beta', 'Client ABC'),
  ('Software subscription', 99.00, 'expense', '2024-02-03', 'General', 'SaaS Provider'),
  ('Client payment', 3000.00, 'income', '2024-02-10', 'Project Gamma', 'Client XYZ'),
  ('Marketing expenses', 500.00, 'expense', '2024-02-08', 'Marketing', 'Ad Agency')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE task ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (you should customize these based on your needs)
-- For development, allowing all operations. In production, you should restrict these.

CREATE POLICY "Enable read access for all users" ON task
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON task
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON task
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON task
  FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON finance
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON finance
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON finance
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON finance
  FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON users
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON users
  FOR DELETE USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_task_updated_at BEFORE UPDATE ON task
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_finance_updated_at BEFORE UPDATE ON finance
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
