import { supabase } from '@/lib/supabase';

// Types
export interface Task {
  id: string;
  user_id: string;
  created_by: string;
  task_name: string;
  description: string | null;
  due_date: string;
  completed_at: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked' | 'cancelled';
  estimated_hours: number;
  actual_hours: number;
  tags: string[];
  attachments: any[];
  created_at: string;
  updated_at: string;
  project_id: string | null;
  progress: number;
  assigned_to?: string; // Member name
}

export interface Member {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  avatar_url: string | null;
  phone: string | null;
  department: string | null;
  hire_date: string | null;
  role: 'admin' | 'member' | 'project_manager';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user_id: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  department: string | null;
  is_active: boolean;
  type: 'member' | 'admin' | 'project_manager';
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  client_name: string | null;
  start_date: string | null;
  expected_end_date: string | null;
  status: 'active' | 'completed' | 'on_hold' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Leave {
  id: string;
  user_id: string;
  leave_date: string | null;
  from_date: string | null;
  to_date: string | null;
  end_date: string | null;
  leave_type: 'sick' | 'casual' | 'paid' | 'maternity' | 'paternity' | 'emergency' | 'vacation';
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approved_by: string | null;
  approved_at: string | null;
  notes: string | null;
  is_half_day: boolean;
  category: string | null;
  brief_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface DailyTask {
  id: string;
  user_id: string;
  created_by: string;
  task_name: string;
  description: string | null;
  task_date: string;
  status: 'pending' | 'completed' | 'skipped';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
  attachments: any[];
  completed_at: string | null;
  is_active: boolean;
  project_id: string | null;
  created_at: string;
  updated_at: string;
}

// Tasks Service
export const tasksService = {
  async getAll() {
    // Since there's no FK relationship, we'll fetch tasks and members separately
    const { data: tasksData, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (tasksError) throw tasksError;
    
    // Fetch all members to map user_id to names
    const { data: membersData, error: membersError } = await supabase
      .from('members')
      .select('id, name');
    
    if (membersError) throw membersError;
    
    // Create a lookup map
    const memberMap = new Map(membersData?.map(m => [m.id, m.name]) || []);
    
    // Transform data to include assigned_to
    return (tasksData || []).map(task => ({
      ...task,
      assigned_to: memberMap.get(task.user_id) || null
    })) as Task[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Task;
  },

  async create(task: Partial<Task>) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
      .select()
      .single();
    
    if (error) throw error;
    return data as Task;
  },

  async update(id: string, updates: Partial<Task>) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Task;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Users Service (Combined Members, Admins, PMs)
export const usersService = {
  async getAllUsers() {
    // Fetch all user types in parallel
    const [members, admins, pms] = await Promise.all([
      supabase.from('members').select('id, name, email, department, is_active').order('name'),
      supabase.from('admins').select('id, name, email, is_active').order('name'),
      supabase.from('project_managers').select('id, name, email, department, is_active').order('name')
    ]);

    if (members.error) throw members.error;
    if (admins.error) throw admins.error;
    if (pms.error) throw pms.error;

    // Combine and type all users
    const allUsers: User[] = [
      ...(members.data || []).map(m => ({ ...m, type: 'member' as const, department: m.department })),
      ...(admins.data || []).map(a => ({ ...a, type: 'admin' as const, department: null })),
      ...(pms.data || []).map(pm => ({ ...pm, type: 'project_manager' as const, department: pm.department }))
    ];

    return allUsers;
  }
};

// Members Service
export const membersService = {
  async getAll() {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Member[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Member;
  },

  async create(member: Partial<Member>) {
    const { data, error } = await supabase
      .from('members')
      .insert([member])
      .select()
      .single();
    
    if (error) throw error;
    return data as Member;
  },

  async update(id: string, updates: Partial<Member>) {
    const { data, error } = await supabase
      .from('members')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Member;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Projects Service
export const projectsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Project[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  async create(project: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  async update(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Leaves Service
export const leavesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('leaves')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Leave[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('leaves')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Leave;
  },

  async create(leave: Partial<Leave>) {
    const { data, error } = await supabase
      .from('leaves')
      .insert([leave])
      .select()
      .single();
    
    if (error) throw error;
    return data as Leave;
  },

  async update(id: string, updates: Partial<Leave>) {
    const { data, error } = await supabase
      .from('leaves')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Leave;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('leaves')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Daily Tasks Service
export const dailyTasksService = {
  async getAll() {
    const { data, error } = await supabase
      .from('daily_tasks')
      .select('*')
      .order('task_date', { ascending: false });
    
    if (error) throw error;
    return data as DailyTask[];
  },

  async getByDate(date: string) {
    const { data, error } = await supabase
      .from('daily_tasks')
      .select('*')
      .eq('task_date', date)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as DailyTask[];
  },

  async create(task: Partial<DailyTask>) {
    const { data, error } = await supabase
      .from('daily_tasks')
      .insert([task])
      .select()
      .single();
    
    if (error) throw error;
    return data as DailyTask;
  },

  async update(id: string, updates: Partial<DailyTask>) {
    const { data, error } = await supabase
      .from('daily_tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as DailyTask;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('daily_tasks')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Dashboard Statistics
export const dashboardService = {
  async getStats() {
    const [tasks, allUsers, projects, leaves] = await Promise.all([
      tasksService.getAll(),
      usersService.getAllUsers(),
      projectsService.getAll(),
      leavesService.getAll()
    ]);

    return {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      pendingTasks: tasks.filter(t => t.status === 'pending').length,
      inProgressTasks: tasks.filter(t => t.status === 'in_progress').length,
      totalMembers: allUsers.length,
      activeMembers: allUsers.filter(m => m.is_active).length,
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'active').length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
      totalLeaves: leaves.length,
      pendingLeaves: leaves.filter(l => l.status === 'pending').length,
      approvedLeaves: leaves.filter(l => l.status === 'approved').length,
      rejectedLeaves: leaves.filter(l => l.status === 'rejected').length
    };
  }
};
