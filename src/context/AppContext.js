import React, { createContext, useReducer } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import remove from 'lodash/remove';

import demoData from '../assets/demo/data.json';
import { move } from '../utils';

const initialState = {
  data: {
    basics: {
      name: '',
      label: '',
      phone: '',
      website: '',
      email: '',
      linkedin: '',
      github: '',
      summary: '',
      location: {
        address: '',
        city: '',
        region: '',
      },
    },
    work: [],
    education: [],
    awards: [],
    certifications: [],
    skills: [],
    references: [],
  },
  theme: {
    layout: 'Onyx',
    font: {
      family: '',
    },
    colors: {
      background: '#ffffff',
      primary: '#212121',
      accent: '#f44336',
    },
  },
  settings: {
    language: 'en',
  },
  config: {
    summary: {
      enable: false,
      heading: 'Summary',
    },
    work: {
      enable: false,
      heading: 'Work Experience',
    },
    education: {
      enable: false,
      heading: 'Education',
    },
    awards: {
      enable: false,
      heading: 'Honors & Awards',
    },
    certifications: {
      enable: false,
      heading: 'Certifications',
    },
    skills: {
      enable: false,
      heading: 'Skills',
    },
    references: {
      enable: false,
      heading: 'References',
    },
  },
};

const reducer = (state = initialState, { type, payload }) => {
  let items;
  const newState = JSON.parse(JSON.stringify(state));

  switch (type) {
    case 'migrate_section':
      return set({ ...newState }, `data.${payload.key}`, payload.value);
    case 'add_item':
      items = get({ ...newState }, `data.${payload.key}`, []);
      items.push(payload.value);
      return set({ ...newState }, `data.${payload.key}`, items);
    case 'delete_item':
      items = get({ ...newState }, `data.${payload.key}`, []);
      remove(items, (x) => x.id === payload.value.id);
      return set({ ...newState }, `data.${payload.key}`, items);
    case 'move_item_up':
      items = get({ ...newState }, `data.${payload.key}`, []);
      move(items, payload.value, -1);
      return set({ ...newState }, `data.${payload.key}`, items);
    case 'move_item_down':
      items = get({ ...newState }, `data.${payload.key}`, []);
      move(items, payload.value, 1);
      return set({ ...newState }, `data.${payload.key}`, items);
    case 'on_input':
      return set({ ...newState }, payload.key, payload.value);
    case 'save_data':
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    case 'import_data':
      if (payload === null) return initialState;

      for (const section of Object.keys(initialState.data)) {
        if (!(section in payload.data)) {
          payload.data[section] = initialState.data[section];
        }
      }
      // enable skills if enable is not defined
      payload.data.skills = payload.data.skills.map((item) => {
        if (item.enable === undefined) {
          item.enable = true;
        }
        return item;
      });
      return {
        ...newState,
        ...payload,
      };
    case 'load_demo_data':
      return {
        ...newState,
        ...demoData,
      };
    case 'reset':
      return initialState;
    default:
      return newState;
  }
};

const AppContext = createContext(initialState);
const { Provider } = AppContext;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export const AppProvider = StateProvider;
export const AppConsumer = AppContext.Consumer;

export default AppContext;
