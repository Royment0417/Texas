import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AdminPanel = ({ tournamentData, onUpdateTournament }) => {
  const [formData, setFormData] = useState({ ...tournamentData });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdateTournament(formData);
    Alert.alert('成功', '比赛信息已保存');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>管理端</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>倒计时设计</Text>
        <TextInput
          style={styles.input}
          value={formData.countdown.toString()}
          onChangeText={(value) => handleChange('countdown', parseInt(value) || 0)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>比赛名称设计</Text>
        <TextInput
          style={styles.input}
          value={formData.tournamentName}
          onChangeText={(value) => handleChange('tournamentName', value)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>级别设计</Text>
        <TextInput
          style={styles.input}
          value={formData.level.toString()}
          onChangeText={(value) => handleChange('level', parseInt(value) || 0)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>人数设计</Text>
        <TextInput
          style={styles.input}
          value={formData.playerCount.toString()}
          onChangeText={(value) => handleChange('playerCount', parseInt(value) || 0)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>总金额设计</Text>
        <TextInput
          style={styles.input}
          value={formData.totalPrize.toString()}
          onChangeText={(value) => handleChange('totalPrize', parseFloat(value) || 0)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>平均金额设计</Text>
        <TextInput
          style={styles.input}
          value={formData.averagePrize.toString()}
          onChangeText={(value) => handleChange('averagePrize', parseFloat(value) || 0)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>盲注设计</Text>
        <View style={styles.blindContainer}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="小盲"
            value={formData.smallBlind.toString()}
            onChangeText={(value) => handleChange('smallBlind', parseInt(value) || 0)}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="大盲"
            value={formData.bigBlind.toString()}
            onChangeText={(value) => handleChange('bigBlind', parseInt(value) || 0)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>下一级别设计</Text>
        <TextInput
          style={styles.input}
          value={formData.nextLevel.toString()}
          onChangeText={(value) => handleChange('nextLevel', parseInt(value) || 0)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>背景设计</Text>
        <TextInput
          style={styles.input}
          value={formData.background}
          onChangeText={(value) => handleChange('background', value)}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>保存设置</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  blindContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminPanel;