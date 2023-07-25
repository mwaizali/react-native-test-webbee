import { Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import styles from './styles';
import { useSelector } from 'react-redux';
import { getMachinesAttributeData } from '../../ducks/machineCategories';
import { Util } from '../../utils';

const FormItem: React.FC = ({ formData, machineIndex, itemIndex, handleAttributeChange }: any) => {
    const attribute = useSelector(getMachinesAttributeData(formData.id));
    return (
        <View key={itemIndex} style={styles.attributeContainer}>
            <Text style={styles.attributeLabel}>{attribute.name}</Text>
            {attribute.type === 'TEXT' || attribute.type === 'NUMBER' ? (
                <TextInput
                    style={styles.input}
                    value={formData.value}
                    keyboardType={
                        attribute.type === 'NUMBER' ? 'number-pad' : 'default'
                    }
                    onChangeText={value =>
                        handleAttributeChange(machineIndex, attribute.id, value)
                    }
                />
            ) : attribute.type === 'CHECKBOX' ? (
                <Switch
                    value={formData.value}
                    onValueChange={value =>
                        handleAttributeChange(machineIndex, attribute.id, value)
                    }
                />
            ) : (
                <TouchableOpacity
                    style={styles.datePickerView}
                    onPress={() =>
                        handleAttributeChange(machineIndex, attribute.id, '', true)
                    }>
                    <Text style={styles.datePickerText}>
                        {formData.value
                            ? Util.formatDate(formData.value, 'MM/DD/YYYY')
                            : 'Select Date'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default FormItem;
