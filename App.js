import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdminPanel from './components/AdminPanel';
import UserDisplay from './components/UserDisplay';
import PlayerManagement from './components/PlayerManagement';
import GameLogic from './components/GameLogic';
import TestAndOptimization from './components/TestAndOptimization';

const App = () => {
  const [currentView, setCurrentView] = useState('admin'); // 'admin', 'user', 'players', 'game', 'test'
  
  // 锦标赛默认数据
  const [tournamentData, setTournamentData] = useState({
    countdown: 300, // 5分钟倒计时
    tournamentName: '德州扑克冠军赛',
    level: 1,
    playerCount: 100,
    totalPrize: 10000,
    averagePrize: 100,
    smallBlind: 10,
    bigBlind: 20,
    nextLevel: 2,
    background: '#ffffff'
  });

  // 玩家数据
  const [players, setPlayers] = useState([
    { id: '1', name: '玩家1', chips: 5000 },
    { id: '2', name: '玩家2', chips: 5000 },
    { id: '3', name: '玩家3', chips: 5000 },
  ]);

  // 游戏状态
  const [gameStatus, setGameStatus] = useState({
    stage: '准备阶段',
    currentHand: 1,
    pot: 0,
    currentBet: 0
  });

  const updateTournamentData = (data) => {
    setTournamentData(data);
  };

  const addPlayer = (player) => {
    setPlayers(prev => [...prev, player]);
  };

  const removePlayer = (playerId) => {
    setPlayers(prev => prev.filter(player => player.id !== playerId));
  };

  const startTournament = () => {
    setGameStatus(prev => ({ ...prev, stage: '开始' }));
  };

  const handlePlayerAction = (action) => {
    console.log('玩家行动:', action);
    // 这里应该有实际的游戏逻辑处理
  };

  const handleNextHand = () => {
    setGameStatus(prev => ({
      ...prev,
      currentHand: prev.currentHand + 1,
      stage: '发牌阶段'
    }));
  };

  const getCurrentPlayer = () => {
    // 简单地返回第一个玩家作为当前玩家
    return players[0] || { name: '无玩家' };
  };

  return (
    <View style={styles.container}>
      {/* 导航栏 */}
      <View style={styles.navbar}>
        <Text style={styles.appTitle}>德州扑克比赛专用软件</Text>
      </View>

      {/* 视图切换按钮 */}
      <View style={styles.tabContainer}>
        <Text 
          style={[styles.tab, currentView === 'admin' && styles.activeTab]}
          onPress={() => setCurrentView('admin')}
        >
          管理端
        </Text>
        <Text 
          style={[styles.tab, currentView === 'user' && styles.activeTab]}
          onPress={() => setCurrentView('user')}
        >
          用户端
        </Text>
        <Text 
          style={[styles.tab, currentView === 'players' && styles.activeTab]}
          onPress={() => setCurrentView('players')}
        >
          玩家管理
        </Text>
        <Text 
          style={[styles.tab, currentView === 'game' && styles.activeTab]}
          onPress={() => setCurrentView('game')}
        >
          游戏桌面
        </Text>
        <Text 
          style={[styles.tab, currentView === 'test' && styles.activeTab]}
          onPress={() => setCurrentView('test')}
        >
          测试优化
        </Text>
      </View>

      {/* 内容区域 */}
      <View style={styles.content}>
        {currentView === 'admin' && (
          <AdminPanel 
            tournamentData={tournamentData} 
            onUpdateTournament={updateTournamentData} 
          />
        )}
        
        {currentView === 'user' && (
          <UserDisplay tournamentData={tournamentData} />
        )}
        
        {currentView === 'players' && (
          <PlayerManagement 
            players={players}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            onStartTournament={startTournament}
          />
        )}
        
        {currentView === 'game' && (
          <GameLogic 
            players={players}
            currentPlayer={getCurrentPlayer()}
            onPlayerAction={handlePlayerAction}
            onNextHand={handleNextHand}
            gameStatus={gameStatus}
          />
        )}
        
        {currentView === 'test' && (
          <TestAndOptimization />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
  },
  appTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTab: {
    color: '#007bff',
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderBottomColor: '#007bff',
  },
  content: {
    flex: 1,
  },
});

export default App;