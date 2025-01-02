import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { XCircle } from 'lucide-react';
import TodoList from './TodoList/TodoList';
import CountdownTimer from './Timer/CountdownTimer';
import Stopwatch from './Timer/Stopwatch';
import Clock from './Clock/Clock';
import Calculator from './Calculator/Calculator';

const tools = [
  { id: 'todo', component: TodoList, title: 'To-Do List' },
  { id: 'countdown', component: CountdownTimer, title: 'Countdown Timer' },
  { id: 'stopwatch', component: Stopwatch, title: 'Stopwatch' },
  { id: 'clock', component: Clock, title: 'Clock' },
  { id: 'calculator', component: Calculator, title: 'Calculator' },
];

export default function ToolsPanel() {
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [toolPositions, setToolPositions] = useState<string[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const toggleTool = (toolId: string) => {
    setActiveTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
    setToolPositions((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(toolPositions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setToolPositions(items);
  };

  const closeTool = (toolId: string) => {
    setActiveTools((prev) => prev.filter((id) => id !== toolId));
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2">
      {/* Toggle Button */}
      <button
        className="text-white px-6 py-2 shadow-lg"
        style={{
          backgroundColor: '#4EA1F3', // Sky blue color
          borderRadius: '8px', // Slightly rounded corners for rectangular shape
        }}
        onClick={() => setIsPanelOpen((prev) => !prev)}
      >
        {isPanelOpen ? 'Close Tools' : 'Open Tools'}
      </button>

      {/* Tools Menu */}
      {isPanelOpen && (
        <div className="mt-2 bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-center">Tools</h3>
          <div className="space-y-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className={`w-full px-4 py-2 rounded-md ${
                  activeTools.includes(tool.id)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {tool.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Draggable Tools */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tools">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="mt-4 space-y-4"
            >
              {toolPositions.map((toolId, index) => {
                const tool = tools.find((t) => t.id === toolId);
                if (!tool || !activeTools.includes(toolId)) return null;

                return (
                  <Draggable key={toolId} draggableId={toolId} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 border rounded-md shadow-md bg-white cursor-move relative"
                      >
                        <button
                          className="absolute top-1 left-1 text-red-600 hover:text-red-800"
                          onClick={() => closeTool(tool.id)}
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                        <tool.component />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
