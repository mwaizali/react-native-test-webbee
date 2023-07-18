import {createReducer} from '@reduxjs/toolkit';
import {makeAction} from '../ActionTypes';

// action creators and types
export const addMachineCategory = makeAction('ADD_MACHINE_CATEGORY');
export const updateMachineCategory = makeAction('UPDATE_MACHINE_CATEGORY');
export const removeMachineCategory = makeAction('REMOVE_MACHINE_CATEGORY');
export const addMachineAttribute = makeAction('ADD_MACHINE_ATTRIBUTE');
export const updateMachineAttribute = makeAction('UPDATE_MACHINE_ATTRIBUTE');
export const removeMachineAttribute = makeAction('REMOVE_MACHINE_ATTRIBUTE');
export const addNewForm = makeAction('ADD_NEW_FORM');
export const updateForm = makeAction('UPDATE_FORM');
export const removeForm = makeAction('REMOVE_FORM');
// init state
const initalState = {data: []};

// init reducer
export default createReducer(initalState, builder => {
  builder.addCase(addMachineCategory, (state, action) => {
    const data = action.payload;
    state.data.push(data);
    // state.data = [...state.data, ...data];
  });
  builder.addCase(updateMachineCategory, (state, action) => {
    const {id, machineName, isTitle} = action.payload;
    const index = state.data.findIndex(machineType => machineType.id === id);
    if (index >= 0 && !isTitle) {
      state.data[index] = {
        ...state.data[index],
        titleAttribute: machineName,
      };
    } else {
      state.data[index] = {
        ...state.data[index],
        name: machineName,
      };
    }
  });
  builder.addCase(removeMachineCategory, (state, action) => {
    const id = action.payload;
    state.data = state.data.filter(machineType => machineType.id !== id);
  });
  builder.addCase(addMachineAttribute, (state, action) => {
    const {id, attribute} = action.payload;
    const index = state.data.findIndex(machineType => machineType.id === id);
    if (index >= 0) {
      state.data[index] = {
        ...state.data[index],
        attributes: [...state.data[index].attributes, ...attribute],
      };
    }
  });
  builder.addCase(updateMachineAttribute, (state, action) => {
    const {id, attribute} = action.payload;
    const index = state.data.findIndex(machineType => machineType.id === id);

    if (index >= 0 && state.data[index].attributes.length > 0) {
      const attributeIndex = state.data[index].attributes.findIndex(
        val => val.id === attribute.id,
      );
      if (attributeIndex >= 0) {
        state.data[index].attributes[attributeIndex] = {
          ...state.data[index].attributes[attributeIndex],
          ...attribute,
        };
      } else {
        state.data[index] = {
          ...state.data[index],
          attributes: [...state.data[index].attributes, ...[attribute]],
        };
      }
    }
  });
  builder.addCase(removeMachineAttribute, (state, action) => {
    const {id, attribute} = action.payload;
    const index = state.data.findIndex(machineType => machineType.id === id);

    if (index >= 0 && state.data[index].attributes.length > 0) {
      state.data[index].attributes = state.data[index].attributes.filter(
        val => val.id !== attribute.id,
      );
    }
  });

  builder.addCase(addNewForm, (state, action) => {
    const {id, data} = action.payload;
    const index = state.data.findIndex(machineType => machineType.id === id);
    if (index >= 0) {
      state.data[index].forms.push(data);
    }
  });
  builder.addCase(updateForm, (state, action) => {
    const {machineId, formId, index, value} = action.payload;
    const machineIndex = state.data.findIndex(
      machineType => machineType.id === machineId,
    );
    const machineData = state.data[machineIndex];
    const formAttributeIndex = machineData.forms[index].findIndex(
      val => val.id === formId,
    );
    machineData.forms[index][formAttributeIndex] = {
      ...machineData.forms[index][formAttributeIndex],
      value: value,
    };
  });
  builder.addCase(removeForm, (state, action) => {
    const {id, form} = action.payload;
    const index = state.data.findIndex(machineType => machineType.id === id);
    if (index >= 0 && state.data[index].attributes.length > 0) {
      state.data[index].forms = state.data[index].forms.filter(
        val => val.id !== form.id,
      );
    }
  });
});

const defaultArray = [];

// selectors

export const getMachines = state =>
  state.machineCategories.data ?? defaultArray;
export const getMachinesData = id => state =>
  state.machineCategories.data.filter(val => val.id === id)[0];
