import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

const PlayerManagement = ({ players, onAddPlayer, onRemovePlayer, onStartTournament }) => {
  const [newPlayer, setNewPlayer] = useState({ name: '', chips: 0 });
  const [isTournamentStarted, setIsTournamentStarted] = useState(false);

  const handleAddPlayer = () => {
    if (newPlayer.name.trim() === '') {
      Alert.alert('错误', '请输入玩家姓名');
      return;
    }
    
    if (players.some(player => player.name === newPlayer.name)) {
      Alert.alert('错误', '该玩家已存在');
      return;
    }
    
    onAddPlayer({ ...newPlayer, id: Date.now().toString() });
    setNewPlayer({ name: '', chips: 5000 }); // 默认筹码5000
  };

  const handleStartTournament = () => {
    if (players.length < 2) {
      Alert.alert('错误', '至少需要2名玩家才能开始比赛');
      return;
    }
    
    setIsTournamentStarted(true);
    onStartTournament();
    Alert.alert('比赛开始', `共有 ${players.length} 名玩家参加比赛`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>玩家管理</Text>
      
      <View style={styles.addPlayerSection}>
        <Text style={styles.sectionTitle}>添加玩家</Text>
        <TextInput
          style={styles.input}
          placeholder="玩家姓名"
          value={newPlayer.name}
          onChangeText={(text) => setNewPlayer({ ...newPlayer, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="初始筹码"
          value={newPlayer.chips.toString()}
          onChangeText={(text) => setNewPlayer({ ...newPlayer, chips: parseInt(text) || 0 })}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
          <Text style={styles.buttonText}>添加玩家</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.playersListSection}>
        <Text style={styles.sectionTitle}>玩家列表 ({players.length})</Text>
        {players.map((player) => (
          <View key={player.id} style={styles.playerItem}>
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerChips}>筹码: {player.chips}</Text>
            </View>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => onRemovePlayer(player.id)}
            >
              <Text style={styles.removeButtonText}>移除</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      
      <View style={styles.tournamentControl}>
        <TouchableOpacity 
          style={[styles.startButton, players.length < 2 && styles.disabledButton]} 
          onPress={handleStartTournament}
          disabled={players.length < 2}
        >
          <Text style={styles.buttonText}>
            {isTournamentStarted ? '比赛进行中...' : '开始比赛'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  addPlayerSection: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playersListSection: {
    marginBottom: 20,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  playerChips: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tournamentControl: {
    marginTop: 20,
  },
  startButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default PlayerManagement;