'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CleaningTask {
  id: number;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  completed: boolean;
  dueDate: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<CleaningTask[]>([
    {
      id: 1,
      name: 'Vacuum floors',
      frequency: 'weekly',
      completed: false,
      dueDate: '2026-05-24',
    },
    {
      id: 2,
      name: 'Clean kitchen',
      frequency: 'daily',
      completed: true,
      dueDate: '2026-05-22',
    },
    {
      id: 3,
      name: 'Bathroom cleaning',
      frequency: 'weekly',
      completed: false,
      dueDate: '2026-05-25',
    },
    {
      id: 4,
      name: 'Wash windows',
      frequency: 'monthly',
      completed: false,
      dueDate: '2026-06-22',
    },
  ]);

  const [newTask, setNewTask] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      setTasks([
        ...tasks,
        {
          id: Math.max(...tasks.map(t => t.id), 0) + 1,
          name: newTask,
          frequency,
          completed: false,
          dueDate: tomorrow.toISOString().split('T')[0],
        },
      ]);
      setNewTask('');
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            🧹 Cleaning Scheduler
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Stay on top of your cleaning tasks
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Tasks Completed
              </p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {completedCount} / {tasks.length}
              </p>
            </div>
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Add New Task Form */}
        <form onSubmit={addTask} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Add New Task
          </label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task name..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
            />
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Add Task
          </button>
        </form>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No tasks yet. Add one to get started!</p>
            </div>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 cursor-pointer accent-indigo-600"
                />
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      task.completed
                        ? 'line-through text-gray-400 dark:text-gray-500'
                        : 'text-gray-800 dark:text-white'
                    }`}
                  >
                    {task.name}
                  </h3>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                      {task.frequency}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Due: {task.dueDate}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded transition-colors"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}