
import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  CheckCircle2,
  Clipboard,
  Calendar,
  Trash,
  X,
  ChevronDown,
  Activity,
  LayoutGrid,
  List as ListIcon,
  User,
  Briefcase,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface TaskStep {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
}

interface PlannerTask {
  id: string;
  title: string;
  clientName: string;
  bucket: string;
  priority: 'Urgent' | 'Important' | 'Medium' | 'Low';
  progress: 'Not started' | 'In progress' | 'Completed';
  startDate: string | null;
  dueDate: string | null;
  repeat: string;
  notes: string;
  showNotesOnCard: boolean;
  steps: TaskStep[];
  showChecklistOnCard: boolean;
  assignees: UserProfile[];
  createdAt: string;
  createdBy: UserProfile;
}

const BUCKETS = ['Backlog', 'Processing', 'Verification', 'Filed'];
const PRIORITIES = ['Urgent', 'Important', 'Medium', 'Low'];
const USERS: UserProfile[] = [
  { id: 'u1', name: 'Rohan Sharma', avatar: 'https://i.pravatar.cc/150?u=rohan' },
  { id: 'u2', name: 'Priya Verma', avatar: 'https://i.pravatar.cc/150?u=priya' },
  { id: 'u3', name: 'Amit Singh', avatar: 'https://i.pravatar.cc/150?u=amit' }
];

const INITIAL_TASKS: PlannerTask[] = [
  {
    id: 'TSK-992',
    title: 'GSTR-3B Filing: Acme Global Solutions',
    clientName: 'Simple Plan',
    bucket: 'Processing',
    priority: 'Urgent',
    progress: 'In progress',
    startDate: '2025-12-01',
    dueDate: '2025-12-20',
    repeat: 'Monthly',
    notes: 'Client has sent the purchase ledger. Manual verification of ITC required.',
    showNotesOnCard: true,
    steps: [
      { id: 's1', text: 'Verify purchase ledger', isCompleted: true },
      { id: 's2', text: 'Calculate tax liability', isCompleted: false }
    ],
    showChecklistOnCard: false,
    assignees: [USERS[0]],
    createdAt: '01 Dec 2025',
    createdBy: USERS[2],
  },
  {
    id: 'TSK-104',
    title: 'Tax Audit Report: Zenith Ventures',
    clientName: 'Private tasks',
    bucket: 'Backlog',
    priority: 'Important',
    progress: 'Not started',
    startDate: null,
    dueDate: '2026-01-15',
    repeat: 'Yearly',
    notes: '',
    showNotesOnCard: false,
    steps: [{ id: 's1', text: 'Scrutinize ledger', isCompleted: false }],
    showChecklistOnCard: true,
    assignees: [USERS[1]],
    createdAt: '15 Nov 2025',
    createdBy: USERS[0],
  }
];

export const Tasks: React.FC = () => {
  const [viewMode, setViewMode] = useState<'registry' | 'board'>('registry');
  const [tasks, setTasks] = useState<PlannerTask[]>(INITIAL_TASKS);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeTask = useMemo(() => 
    tasks.find(t => t.id === selectedTaskId), 
    [tasks, selectedTaskId]
  );

  const patchTask = (id: string, updates: Partial<PlannerTask>) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const updated = { ...t, ...updates };
      if (updates.progress === 'Completed') updated.bucket = 'Filed';
      return updated;
    }));
  };

  const handleAddNewTask = () => {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const newTask: PlannerTask = {
      id: `TSK-${Math.floor(100 + Math.random() * 899)}`,
      title: '',
      clientName: 'Private tasks',
      bucket: 'Backlog',
      priority: 'Medium',
      progress: 'Not started',
      startDate: null,
      dueDate: null,
      repeat: 'Does not repeat',
      notes: '',
      showNotesOnCard: false,
      steps: [],
      showChecklistOnCard: false,
      assignees: [],
      createdAt: today,
      createdBy: USERS[0],
    };
    setTasks([...tasks, newTask]);
    setSelectedTaskId(newTask.id);
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen bg-slate-50 flex flex-col overflow-hidden font-sans pt-24 pb-12">
      
      {/* Registry Header */}
      <div className="container mx-auto px-4 mb-8">
        <header className="bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-sm p-6 gap-6">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900 leading-tight">Statutory Registry</h1>
                  <p className="text-xs text-slate-500 font-medium">Enterprise Task Management</p>
                </div>
             </div>
             
             <nav className="flex items-center bg-slate-100 rounded-xl p-1 ml-4">
                <button 
                  onClick={() => setViewMode('registry')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all 
                    ${viewMode === 'registry' ? 'bg-white text-accent-500 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  <ListIcon size={14} /> Registry
                </button>
                <button 
                  onClick={() => setViewMode('board')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all 
                    ${viewMode === 'board' ? 'bg-white text-accent-500 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  <LayoutGrid size={14} /> Board
                </button>
             </nav>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search entries..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-accent-500 transition-all w-full md:w-72"
                />
             </div>
             <button onClick={handleAddNewTask} className="bg-accent-500 text-white p-3 rounded-xl shadow-lg hover:bg-accent-600 transition-colors">
                <Plus size={20} />
             </button>
          </div>
        </header>
      </div>

      <div className="flex-1 container mx-auto px-4 relative">
        {viewMode === 'registry' ? (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-slate-50">
                      <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">
                         <th className="pl-8 pr-4 py-5 w-12">Status</th>
                         <th className="px-4 py-5 w-[30%]">Entry Name</th>
                         <th className="px-4 py-5">Project Plan</th>
                         <th className="px-4 py-5">Due Date</th>
                         <th className="px-4 py-5">Priority</th>
                         <th className="px-4 py-5">Progress</th>
                         <th className="px-4 py-5">Assignee</th>
                         <th className="px-4 py-5 text-center">Audit</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {filteredTasks.map(task => {
                        const isDone = task.progress === 'Completed';
                        return (
                          <tr 
                            key={task.id} 
                            onClick={() => setSelectedTaskId(task.id)}
                            className={`group transition-colors cursor-pointer ${selectedTaskId === task.id ? 'bg-accent-50/20' : 'hover:bg-slate-50/50'}`}
                          >
                             <td className="pl-8 pr-4 py-4">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); patchTask(task.id, { progress: isDone ? 'Not started' : 'Completed' })}}
                                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                                    ${isDone ? 'bg-emerald-500 border-emerald-500 text-white shadow-md' : 'border-slate-300 group-hover:border-accent-500 bg-white'}
                                  `}
                                >
                                   {isDone && <CheckCircle2 size={14} />}
                                </button>
                             </td>
                             <td className="px-4 py-4">
                                <div className={`text-sm font-bold ${isDone ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{task.title || 'Draft Registry Entry'}</div>
                                <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-tighter mt-1">{task.id}</div>
                             </td>
                             <td className="px-4 py-4">
                                <span className="text-xs font-bold text-slate-600">{task.clientName}</span>
                             </td>
                             <td className="px-4 py-4">
                                <span className={`text-xs font-bold ${!isDone && task.dueDate && new Date(task.dueDate) < new Date() ? 'text-rose-600' : 'text-slate-500'}`}>
                                  {task.dueDate || '--'}
                                </span>
                             </td>
                             <td className="px-4 py-4">
                                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded bg-slate-100 ${task.priority === 'Urgent' ? 'text-rose-600 bg-rose-50' : 'text-slate-400'}`}>
                                  {task.priority}
                                </span>
                             </td>
                             <td className="px-4 py-4">
                                <div className="flex items-center gap-2">
                                  {isDone ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Clock size={14} className="text-slate-300" />}
                                  <span className={`text-[10px] font-black uppercase ${isDone ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {task.progress}
                                  </span>
                                </div>
                             </td>
                             <td className="px-4 py-4">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                   {task.assignees[0] ? <img src={task.assignees[0].avatar} className="w-full h-full object-cover" /> : <User size={14} className="text-slate-400" />}
                                </div>
                             </td>
                             <td className="px-4 py-4">
                                <div className="flex items-center justify-center gap-4 text-slate-300">
                                   {task.steps.length > 0 && <Activity size={14} />}
                                   {task.notes && <Clipboard size={14} />}
                                </div>
                             </td>
                          </tr>
                        );
                      })}
                   </tbody>
                </table>
             </div>
             
             {filteredTasks.length === 0 && (
               <div className="p-20 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <Search size={32} />
                  </div>
                  <h3 className="text-slate-900 font-bold">No entries found</h3>
                  <p className="text-slate-500 text-sm">Try adjusting your search filters.</p>
               </div>
             )}
          </div>
        ) : (
          <div className="flex gap-8 items-start overflow-x-auto no-scrollbar pb-8">
            {BUCKETS.map(bucket => {
              const bucketTasks = tasks.filter(t => t.bucket === bucket);
              return (
                <div key={bucket} className="w-[320px] flex-shrink-0 flex flex-col">
                  <div className="flex items-center justify-between mb-6 px-2">
                    <div className="flex items-center gap-3">
                       <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{bucket}</h2>
                       <span className="bg-white text-slate-500 text-[10px] font-black px-2.5 py-1 rounded-full border border-slate-200 shadow-sm">{bucketTasks.length}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {bucketTasks.map(task => (
                      <div 
                        key={task.id} 
                        onClick={() => setSelectedTaskId(task.id)} 
                        className={`bg-white rounded-2xl border p-6 transition-all cursor-pointer hover:shadow-xl group ${selectedTaskId === task.id ? 'border-accent-500 shadow-lg ring-4 ring-accent-500/5' : 'border-slate-200 shadow-sm'}`}
                      >
                         <div className="flex justify-between items-start mb-4">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${task.priority === 'Urgent' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'}`}>{task.priority}</span>
                            <span className="text-[10px] font-mono text-slate-300 group-hover:text-slate-400">{task.id}</span>
                         </div>
                         <h3 className={`font-bold mb-4 leading-snug ${task.progress === 'Completed' ? 'text-slate-300 line-through' : 'text-slate-900'}`}>{task.title || 'Draft Registry Entry'}</h3>
                         <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                               <Calendar size={12} className="text-accent-500" /> 
                               <span>{task.dueDate || 'No Date'}</span>
                            </div>
                            <div className="flex -space-x-2">
                               {task.assignees.map(a => <img key={a.id} src={a.avatar} className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm" />)}
                            </div>
                         </div>
                      </div>
                    ))}
                    <button onClick={handleAddNewTask} className="w-full py-5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-accent-500 hover:text-accent-500 hover:bg-white transition-all flex items-center justify-center gap-2 group">
                       <Plus size={16} className="group-hover:scale-110 transition-transform" />
                       <span className="text-xs font-bold uppercase tracking-wider">Add Registry Card</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* INSPECTOR SIDEBAR */}
        {activeTask && (
          <>
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity" onClick={() => setSelectedTaskId(null)} />
            <aside className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-white z-50 flex flex-col shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.15)] animate-in slide-in-from-right duration-300">
               <header className="px-10 py-10 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10 bg-white/95 backdrop-blur-md">
                  <div className="flex items-center gap-6">
                     <button 
                      onClick={() => patchTask(activeTask.id, { progress: activeTask.progress === 'Completed' ? 'Not started' : 'Completed' })}
                      className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all 
                        ${activeTask.progress === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white shadow-xl scale-105' : 'border-slate-200 hover:border-accent-500 bg-white'}
                      `}
                     >
                        {activeTask.progress === 'Completed' && <CheckCircle2 size={32} />}
                     </button>
                     <div>
                        <input 
                          className="text-2xl font-black text-slate-900 bg-transparent border-none p-0 focus:ring-0 w-full mb-1 tracking-tight placeholder:text-slate-200"
                          value={activeTask.title}
                          onChange={(e) => patchTask(activeTask.id, { title: e.target.value })}
                          placeholder="Untitled Entry"
                        />
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-black text-accent-500 uppercase tracking-widest">{activeTask.id}</span>
                           <span className="text-slate-200">•</span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeTask.clientName}</span>
                        </div>
                     </div>
                  </div>
                  <button onClick={() => setSelectedTaskId(null)} className="p-3 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-slate-900">
                     <X size={32} />
                  </button>
               </header>

               <div className="flex-1 overflow-y-auto p-10 space-y-12 no-scrollbar">
                  
                  {/* FIELDS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Priority Level</label>
                        <div className="relative group">
                          <select 
                            className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase text-slate-700 focus:border-accent-500 focus:ring-4 focus:ring-accent-500/5 cursor-pointer appearance-none shadow-sm transition-all"
                            value={activeTask.priority}
                            onChange={(e) => patchTask(activeTask.id, { priority: e.target.value as any })}
                          >
                             {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                          <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-accent-500 transition-colors" />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Filing Bucket</label>
                        <div className="relative group">
                          <select 
                            className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase text-slate-700 focus:border-accent-500 focus:ring-4 focus:ring-accent-500/5 cursor-pointer appearance-none shadow-sm transition-all"
                            value={activeTask.bucket}
                            onChange={(e) => patchTask(activeTask.id, { bucket: e.target.value })}
                          >
                             {BUCKETS.map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                          <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-accent-500 transition-colors" />
                        </div>
                     </div>
                  </div>

                  {/* DATE & CYCLE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Compliance Due Date</label>
                        <div className="relative group">
                           <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-accent-500 pointer-events-none" />
                           <input 
                             type="date"
                             className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:border-accent-500 focus:ring-4 focus:ring-accent-500/5 shadow-sm transition-all"
                             value={activeTask.dueDate || ''}
                             onChange={(e) => patchTask(activeTask.id, { dueDate: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Review Cycle</label>
                        <div className="relative group">
                           <select 
                             className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:border-accent-500 focus:ring-4 focus:ring-accent-500/5 appearance-none shadow-sm cursor-pointer transition-all"
                             value={activeTask.repeat}
                             onChange={(e) => patchTask(activeTask.id, { repeat: e.target.value })}
                           >
                              {['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly', 'Does not repeat'].map(r => <option key={r} value={r}>{r}</option>)}
                           </select>
                           <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-accent-500 transition-colors" />
                        </div>
                     </div>
                  </div>

                  {/* NOTES */}
                  <section className="space-y-4">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                        <Clipboard size={16} className="text-accent-500" /> Statutory Audit Notes
                     </h4>
                     <textarea 
                      value={activeTask.notes}
                      onChange={(e) => patchTask(activeTask.id, { notes: e.target.value })}
                      placeholder="Enter technical details, regulatory requirements, or internal notes here..."
                      className="w-full h-56 p-8 bg-white border border-slate-200 rounded-3xl text-sm font-medium text-slate-600 focus:border-accent-500 focus:ring-4 focus:ring-accent-500/5 resize-none shadow-sm transition-all"
                     />
                  </section>

                  {/* AUDIT LOG */}
                  <section className="pt-10 border-t border-slate-100">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-8 ml-1">
                         <ShieldCheck size={16} className="text-accent-500" /> Data Integrity Trail
                      </h4>
                      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-6">
                         <div className="flex justify-between items-center">
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Registered By</span>
                            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                               <img src={activeTask.createdBy.avatar} className="w-6 h-6 rounded-full" />
                               <span className="font-bold text-slate-700 text-xs">{activeTask.createdBy.name}</span>
                            </div>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Entry Created On</span>
                            <span className="font-bold text-slate-700 text-xs bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">{activeTask.createdAt}</span>
                         </div>
                      </div>
                  </section>
               </div>

               <footer className="px-10 py-10 border-t border-slate-100 bg-white flex items-center justify-between">
                  <button 
                    onClick={() => { setTasks(tasks.filter(t => t.id !== activeTask.id)); setSelectedTaskId(null) }}
                    className="flex items-center gap-2 px-8 py-4 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-rose-100 hover:scale-105 active:scale-95"
                  >
                     <Trash size={18} /> Delete Registry Entry
                  </button>
                  <button 
                    onClick={() => setSelectedTaskId(null)}
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
                  >
                    Save & Close
                  </button>
               </footer>
            </aside>
          </>
        )}

      </div>
    </div>
  );
};
