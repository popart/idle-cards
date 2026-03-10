// Scripted events. Add new entries here — no coding required.
//
// Trigger types:
//   { type: 'start' }                 — fires when the game first loads
//   { type: 'energy', threshold: N }  — fires when energy reaches N
//
// Optional:
//   show: '#element-id'               — reveals a hidden element when the event fires
//
// Each event fires only once (tracked by id).

export const EVENTS = [
  {
    id: 'intro_1',
    trigger: { type: 'start' },
    message: 'Darkness. Then, a pulse.',
  },
  {
    id: 'intro_2',
    trigger: { type: 'energy', threshold: 10 },
    message: 'You are the monolith. You do not know how long you have been here.',
  },
  {
    id: 'intro_3',
    trigger: { type: 'energy', threshold: 20 },
    message: 'Strange creatures gather around you. They seem... drawn to your light.',
  },
  {
    id: 'energy_100',
    trigger: { type: 'energy', threshold: 100 },
    message: 'The primates grow restless. One reaches out and touches the monolith.',
    show: '#primates-widget',
  },
  {
    id: 'energy_500',
    trigger: { type: 'energy', threshold: 500 },
    message: 'They have begun to communicate. Crude gestures. The beginning of language.',
  },
  {
    id: 'energy_1000',
    trigger: { type: 'energy', threshold: 1000 },
    message: 'Tools. They are making tools. You feel something like pride.',
  },
];
