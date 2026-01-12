import { Brain, Database, Zap, RefreshCw, MessageSquare, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            How Superbot Works
          </h1>
          <p className="text-xl text-gray-300">
            Understanding the AI-Powered Natural Language to SQL Pipeline
          </p>
        </div>

        {/* Architecture Overview */}
        <div className="mb-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            Architecture Overview
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Superbot is powered by a sophisticated n8n pipeline that transforms natural language questions 
            into SQL queries, executes them on a Supabase PostgreSQL database, and returns human-readable results.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The system uses <span className="text-blue-400 font-semibold">vector embeddings</span> and 
            <span className="text-purple-400 font-semibold"> Pinecone vector database</span> to intelligently 
            understand your database schema and generate accurate queries.
          </p>
        </div>

        {/* Step-by-Step Pipeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">The Query Processing Pipeline</h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-6 border border-blue-400/30">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 rounded-full p-3 mt-1">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">1. User Input</h3>
                  <p className="text-gray-300 mb-2">
                    You ask a question in natural language, like "Show me all tasks assigned to John" or 
                    "What are the active projects this month?"
                  </p>
                  <div className="bg-black/30 rounded-lg p-3 mt-3">
                    <code className="text-sm text-green-400">
                      📨 Chat Trigger receives your message via webhook
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-lg rounded-xl p-6 border border-purple-400/30">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 rounded-full p-3 mt-1">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">2. Vector Schema Retrieval</h3>
                  <p className="text-gray-300 mb-2">
                    The AI Agent uses <strong>Pinecone Vector Store</strong> to retrieve the most relevant 
                    database schema information based on your query.
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 mb-3">
                    <li>Your question is converted to a <strong>vector embedding</strong> using OpenAI or Google Gemini</li>
                    <li>Pinecone performs <strong>semantic similarity search</strong> to find top 5 relevant table schemas</li>
                    <li>Only relevant schemas are loaded (not the entire database), making queries faster and more accurate</li>
                  </ul>
                  <div className="bg-black/30 rounded-lg p-3 mt-3">
                    <code className="text-sm text-purple-400">
                      🔍 Tool: retrieve_database_schema → Returns relevant table structures
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-xl p-6 border border-green-400/30">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 rounded-full p-3 mt-1">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">3. SQL Query Generation</h3>
                  <p className="text-gray-300 mb-2">
                    The AI Agent (powered by <strong>GPT-4o-mini</strong> or <strong>Google Gemini</strong>) 
                    generates a PostgreSQL query based on:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 mb-3">
                    <li>Your natural language question</li>
                    <li>Retrieved database schema context</li>
                    <li>Conversation history (Window Buffer Memory)</li>
                    <li>Strict security rules (only SELECT queries allowed)</li>
                  </ul>
                  <div className="bg-black/30 rounded-lg p-3 mt-3">
                    <code className="text-sm text-green-400">
                      🤖 AI Agent outputs raw PostgreSQL SELECT statement
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-lg rounded-xl p-6 border border-yellow-400/30">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-500 rounded-full p-3 mt-1">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">4. Query Validation & Enhancement</h3>
                  <p className="text-gray-300 mb-2">
                    The generated query passes through a <strong>validation and enhancement layer</strong>:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 mb-3">
                    <li>Checks if query is a valid SELECT statement (rejects INSERT, UPDATE, DELETE)</li>
                    <li>Optimizes query structure and performance</li>
                    <li>Fixes syntax errors if any</li>
                    <li>Ensures query is safe to execute</li>
                  </ul>
                  <div className="bg-black/30 rounded-lg p-3 mt-3">
                    <code className="text-sm text-yellow-400">
                      ✅ If valid → Execute | ❌ If invalid → Friendly fallback response
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 backdrop-blur-lg rounded-xl p-6 border border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-500 rounded-full p-3 mt-1">
                  <Database className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">5. Query Execution</h3>
                  <p className="text-gray-300 mb-2">
                    The validated SQL query is executed on the <strong>Supabase PostgreSQL</strong> database:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 mb-3">
                    <li>Direct connection to production database</li>
                    <li>Row-level security policies enforced</li>
                    <li>Results returned as JSON array</li>
                    <li>Error handling with graceful fallbacks</li>
                  </ul>
                  <div className="bg-black/30 rounded-lg p-3 mt-3">
                    <code className="text-sm text-cyan-400">
                      📊 Postgres2 node executes query and returns raw data
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-gradient-to-r from-pink-500/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-6 border border-pink-400/30">
              <div className="flex items-start gap-4">
                <div className="bg-pink-500 rounded-full p-3 mt-1">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">6. Human-Readable Response</h3>
                  <p className="text-gray-300 mb-2">
                    Raw database results are transformed into a conversational response:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 mb-3">
                    <li>Results combined and formatted by Code node</li>
                    <li><strong>Summarize</strong> AI node converts data to natural language</li>
                    <li>Maintains context with conversation history</li>
                    <li>Returns friendly, easy-to-understand answer</li>
                  </ul>
                  <div className="bg-black/30 rounded-lg p-3 mt-3">
                    <code className="text-sm text-pink-400">
                      💬 "I found 5 tasks assigned to John. Here they are..."
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schema Update Mechanism */}
        <div className="mb-16 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 backdrop-blur-lg rounded-2xl p-8 border border-emerald-400/30">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <RefreshCw className="w-8 h-8 text-emerald-400" />
            Automatic Schema Updates
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The system uses a <strong>scheduled pipeline</strong> that runs periodically to keep schema 
            vectors up-to-date:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-black/30 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-3 text-emerald-400">1. Schema Extraction</h4>
              <p className="text-gray-300 text-sm">
                Queries <code className="text-emerald-300">information_schema</code> to get all table 
                structures, columns, and data types from the Supabase database.
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-3 text-emerald-400">2. CREATE Statement Generation</h4>
              <p className="text-gray-300 text-sm">
                Converts schema data into readable <code className="text-emerald-300">CREATE TABLE</code> statements 
                that the AI can understand contextually.
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-3 text-emerald-400">3. Vector Embedding</h4>
              <p className="text-gray-300 text-sm">
                Each table schema is converted to a vector embedding using OpenAI or Google Gemini embeddings, 
                capturing semantic meaning.
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-3 text-emerald-400">4. Pinecone Upsert</h4>
              <p className="text-gray-300 text-sm">
                Schema vectors are upserted to Pinecone, ensuring the AI Agent always has access to the 
                latest database structure.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-emerald-900/30 rounded-lg p-4 border border-emerald-500/30">
            <p className="text-sm text-emerald-300">
              <strong>💡 Why This Matters:</strong> When you add new tables or modify columns in your database, 
              the AI automatically learns about these changes without manual retraining or configuration.
            </p>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold mb-6">🛠️ Technical Stack</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-black/30 rounded-lg p-4">
              <h4 className="font-bold mb-2 text-blue-400">AI & Embeddings</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• OpenAI GPT-4o-mini</li>
                <li>• Google Gemini 2.5 Flash</li>
                <li>• OpenAI Embeddings</li>
                <li>• Google Gemini Embeddings</li>
              </ul>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4">
              <h4 className="font-bold mb-2 text-purple-400">Vector & Database</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Pinecone Vector DB</li>
                <li>• Supabase PostgreSQL</li>
                <li>• Window Buffer Memory</li>
              </ul>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4">
              <h4 className="font-bold mb-2 text-green-400">Orchestration</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• n8n Workflow Engine</li>
                <li>• LangChain Framework</li>
                <li>• Webhook Triggers</li>
                <li>• Scheduled Tasks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-red-500/10 backdrop-blur-lg rounded-xl p-6 border border-red-400/30">
          <h3 className="text-xl font-bold mb-2 text-red-400">🔒 Security First</h3>
          <p className="text-gray-300 text-sm">
            The system only allows <strong>SELECT</strong> queries. INSERT, UPDATE, DELETE, and DDL statements 
            are automatically rejected to ensure your database remains safe and unmodified through the chat interface.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
