import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import ToolsPanel from '../Tools/ToolsPanel';

export default function Whiteboard() {
  return (
    <div className="h-screen w-full relative">
      <Tldraw />
      <ToolsPanel />
    </div>
  );
}