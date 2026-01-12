import { MessageSquare, Code, Database, Users, Calendar, BarChart, FileText, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const SampleQueries = () => {
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    // Remove quotes from the text
    const cleanText = text.replace(/^"|"$/g, '');
    navigator.clipboard.writeText(cleanText);
    setCopiedQuery(text);
    setTimeout(() => setCopiedQuery(null), 2000);
  };

  const QueryCard = ({ query }: { query: string }) => (
    <div className="bg-black/30 rounded-lg p-4 hover:bg-black/40 transition-colors group flex items-center justify-between gap-2">
      <p className="text-gray-300 flex-1">{query}</p>
      <button
        onClick={() => copyToClipboard(query)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-lg"
        title="Copy query"
      >
        {copiedQuery === query ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Sample Queries
          </h1>
          <p className="text-xl text-gray-300">
            Try these natural language questions to interact with your database
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-12 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-500 rounded-full p-3 mt-1">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">Ask Questions Naturally</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                The AI agent understands natural language and converts your questions into SQL queries automatically. 
                Below are sample queries organized by category to help you get started.
              </p>
              <p className="text-indigo-300 text-sm">
                💡 <strong>Tip:</strong> You can ask questions in your own words - the AI will understand the intent 
                and retrieve the relevant data from your Supabase database.
              </p>
            </div>
          </div>
        </div>

        {/* Query Categories */}
        <div className="space-y-8">
          {/* Tasks & Progress */}
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500 rounded-lg p-3">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-blue-400">Tasks & Progress</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <QueryCard query="Show me all overdue tasks" />
              <QueryCard query="What tasks are assigned to John this week?" />
              <QueryCard query="List all high-priority tasks that are in progress" />
              <QueryCard query="How many tasks were completed today?" />
              <QueryCard query="Show tasks with approaching deadlines" />
              <QueryCard query="What are the pending tasks for the mobile app project?" />
            </div>
          </div>

          {/* Projects & Teams */}
          <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-500 rounded-lg p-3">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-purple-400">Projects & Teams</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <QueryCard query="Show me all active projects" />
              <QueryCard query="Which projects are managed by Sarah?" />
              <QueryCard query="List projects created in the last month" />
              <QueryCard query="What are the project deadlines this quarter?" />
              <QueryCard query="How many projects are currently in progress?" />
              <QueryCard query="Show project completion status" />
            </div>
          </div>

          {/* Members & HR */}
          <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-2xl p-8 border border-green-400/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-500 rounded-lg p-3">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-green-400">Members & HR</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <QueryCard query="List all team members with their roles" />
              <QueryCard query="Who are the active members in the development team?" />
              <QueryCard query="Show members who joined in the last 6 months" />
              <QueryCard query="What is the total number of active members?" />
              <QueryCard query="List all project managers and their email addresses" />
              <QueryCard query="Show member activity in the last week" />
            </div>
          </div>

          {/* Leaves & Attendance */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-lg rounded-2xl p-8 border border-yellow-400/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-500 rounded-lg p-3">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-yellow-400">Leaves & Attendance</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <QueryCard query="Show all pending leave requests" />
              <QueryCard query="Who is on leave this week?" />
              <QueryCard query="What are the upcoming company holidays?" />
              <QueryCard query="How many sick leaves were taken last month?" />
              <QueryCard query="Show approved leave requests for this quarter" />
              <QueryCard query="What is the remaining leave balance for each member?" />
            </div>
          </div>

          {/* Analytics & Reports */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-cyan-500 rounded-lg p-3">
                <BarChart className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-cyan-400">Analytics & Reports</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <QueryCard query="What is the completion rate of tasks this month?" />
              <QueryCard query="Show task distribution by priority" />
              <QueryCard query="How many daily tasks were logged today?" />
              <QueryCard query="Which project has the most pending tasks?" />
              <QueryCard query="Show productivity trends for the last 3 months" />
              <QueryCard query="List the top 5 most active members" />
            </div>
          </div>

          {/* Audit & Activity */}
          <div className="bg-gradient-to-r from-pink-500/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-pink-400/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-pink-500 rounded-lg p-3">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-pink-400">Audit & Activity</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <QueryCard query="Show recent audit logs" />
              <QueryCard query="What actions were performed by admin today?" />
              <QueryCard query="List all notifications sent this week" />
              <QueryCard query="Show deleted tasks from the last 7 days" />
              <QueryCard query="Display recent system changes" />
              <QueryCard query="Who modified the task settings recently?" />
            </div>
          </div>
        </div>

        {/* Footer Tips */}
        <div className="mt-12 space-y-4">
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-xl p-6 border border-indigo-400/30">
            <h4 className="font-bold text-lg mb-2 text-indigo-300">🎯 Getting Started</h4>
            <p className="text-gray-300 text-sm">
              Navigate to the <strong>Chat with AI</strong> section from the home page and try any of these queries. 
              The AI will understand your question, generate the appropriate SQL query, execute it, and return 
              the results in a human-readable format.
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-lg rounded-xl p-6 border border-emerald-400/30">
            <h4 className="font-bold text-lg mb-2 text-emerald-300">🔒 Security Note</h4>
            <p className="text-gray-300 text-sm">
              All queries are restricted to <strong>SELECT</strong> statements only. The system automatically 
              rejects any attempts to modify, delete, or alter database data, ensuring your data remains safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleQueries;
