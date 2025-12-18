import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const GameLogic = ({ players, currentPlayer, onPlayerAction, onNextHand, gameStatus }) => {
  const [communityCards, setCommunityCards] = useState([]);
  const [pot, setPot] = useState(0);
  const [currentBet, setCurrentBet] = useState(0);

  // 发牌函数
  const dealCards = () => {
    // 这里应该有真实的发牌逻辑
    const deck = generateDeck();
    const shuffled = shuffleDeck(deck);
    
    // 发私牌
    const hands = {};
    players.forEach((player, index) => {
      hands[player.id] = [shuffled[index * 2], shuffled[index * 2 + 1]];
    });
    
    return hands;
  };

  // 生成一副牌
  const generateDeck = () => {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];
    
    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push(`${rank}${suit}`);
      }
    }
    
    return deck;
  };

  // 洗牌
  const shuffleDeck = (deck) => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 发公共牌
  const dealCommunityCards = (stage) => {
    const deck = generateDeck();
    const shuffled = shuffleDeck(deck);
    
    switch (stage) {
      case 'flop':
        setCommunityCards([shuffled[0], shuffled[1], shuffled[2]]);
        break;
      case 'turn':
        setCommunityCards(prev => [...prev, shuffled[3]]);
        break;
      case 'river':
        setCommunityCards(prev => [...prev, shuffled[4]]);
        break;
    }
  };

  // 玩家行动
  const handlePlayerAction = (action, amount = 0) => {
    switch (action) {
      case 'fold':
        Alert.alert('弃牌', `${currentPlayer.name} 弃牌`);
        onPlayerAction({ action: 'fold', player: currentPlayer });
        break;
      case 'check':
        Alert.alert('过牌', `${currentPlayer.name} 过牌`);
        onPlayerAction({ action: 'check', player: currentPlayer });
        break;
      case 'call':
        Alert.alert('跟注', `${currentPlayer.name} 跟注 ${currentBet}`);
        onPlayerAction({ action: 'call', amount: currentBet, player: currentPlayer });
        break;
      case 'raise':
        if (amount <= currentBet) {
          Alert.alert('错误', '加注金额必须大于当前注额');
          return;
        }
        Alert.alert('加注', `${currentPlayer.name} 加注到 ${amount}`);
        setCurrentBet(amount);
        onPlayerAction({ action: 'raise', amount, player: currentPlayer });
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>游戏桌面</Text>
      
      {/* 游戏状态信息 */}
      <View style={styles.gameInfo}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>底池</Text>
          <Text style={styles.infoValue}>{pot}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>当前注额</Text>
          <Text style={styles.infoValue}>{currentBet}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>阶段</Text>
          <Text style={styles.infoValue}>{gameStatus.stage}</Text>
        </View>
      </View>
      
      {/* 公共牌区域 */}
      <View style={styles.communityCards}>
        <Text style={styles.sectionTitle}>公共牌</Text>
        <View style={styles.cardsContainer}>
          {communityCards.map((card, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}>{card}</Text>
            </View>
          ))}
          {[...Array(5 - communityCards.length)].map((_, index) => (
            <View key={`empty-${index}`} style={[styles.card, styles.emptyCard]} />
          ))}
        </View>
      </View>
      
      {/* 当前玩家操作区 */}
      <View style={styles.actionArea}>
        <Text style={styles.currentPlayerText}>当前玩家: {currentPlayer.name}</Text>
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.foldButton]} 
            onPress={() => handlePlayerAction('fold')}
          >
            <Text style={styles.actionText}>弃牌</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.checkButton]} 
            onPress={() => handlePlayerAction('check')}
            disabled={currentBet > 0}
          >
            <Text style={styles.actionText}>过牌</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.callButton]} 
            onPress={() => handlePlayerAction('call')}
            disabled={currentBet === 0}
          >
            <Text style={styles.actionText}>跟注 ({currentBet})</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.raiseButton]} 
            onPress={() => handlePlayerAction('raise', currentBet * 2)}
          >
            <Text style={styles.actionText}>加注</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* 下一手牌按钮 */}
      <TouchableOpacity 
        style={styles.nextHandButton} 
        onPress={onNextHand}
      >
        <Text style={styles.nextHandText}>下一手牌</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#007a5e', // 绿色扑克桌背景
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  infoLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  infoValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  communityCards: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
  },
  card: {
    width: 60,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  emptyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actionArea: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  currentPlayerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    minWidth: 70,
  },
  foldButton: {
    backgroundColor: '#dc3545',
  },
  checkButton: {
    backgroundColor: '#28a745',
  },
  callButton: {
    backgroundColor: '#007bff',
  },
  raiseButton: {
    backgroundColor: '#ffc107',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nextHandButton: {
    backgroundColor: '#6f42c1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextHandText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameLogic;