type Listener = () => void;

let isOpen = false;
const listeners = new Set<Listener>();

export const commandPaletteStore = {
  getSnapshot: () => isOpen,
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  open: () => {
    isOpen = true;
    listeners.forEach((l) => l());
  },
  close: () => {
    isOpen = false;
    listeners.forEach((l) => l());
  },
  toggle: () => {
    isOpen = !isOpen;
    listeners.forEach((l) => l());
  },
};
