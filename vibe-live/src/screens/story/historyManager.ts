import { StoryElement } from './types';

const MAX_HISTORY = 20;

export interface HistoryState {
  past: StoryElement[][];
  present: StoryElement[];
  future: StoryElement[][];
}

export class HistoryManager {
  private state: HistoryState;

  constructor(initialElements: StoryElement[] = []) {
    this.state = {
      past: [],
      present: initialElements,
      future: [],
    };
  }

  push(elements: StoryElement[]): void {
    // Add current state to past
    this.state.past.push(this.state.present);

    // Limit past to MAX_HISTORY
    if (this.state.past.length > MAX_HISTORY) {
      this.state.past.shift();
    }

    // Clear future when a new action is performed
    this.state.future = [];

    // Update present
    this.state.present = elements;
  }

  undo(): StoryElement[] | null {
    if (this.state.past.length === 0) return null;

    // Move present to future
    this.state.future.unshift(this.state.present);

    // Pop from past
    this.state.present = this.state.past.pop()!;

    return this.state.present;
  }

  redo(): StoryElement[] | null {
    if (this.state.future.length === 0) return null;

    // Move present to past
    this.state.past.push(this.state.present);

    // Pop from future
    this.state.present = this.state.future.shift()!;

    return this.state.present;
  }

  canUndo(): boolean {
    return this.state.past.length > 0;
  }

  canRedo(): boolean {
    return this.state.future.length > 0;
  }

  getPresent(): StoryElement[] {
    return this.state.present;
  }

  reset(elements: StoryElement[] = []): void {
    this.state = {
      past: [],
      present: elements,
      future: [],
    };
  }

  getState(): HistoryState {
    return this.state;
  }
}

export default HistoryManager;
