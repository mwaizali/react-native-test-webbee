import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  machineTypeContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  machineTypeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formCreator: {
    marginBottom: 20,
  },
  formInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
  },
  formField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  attributeNameInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  attributeTypePicker: {
    flex: 0.6,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center', // width: 30,
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  addFieldButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  addFieldButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#007BFF',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  removeMachineTypeButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  removeMachineTypeButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  addMachineTypeButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  addMachineTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: 'green',
  },
  addMachineTypeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
