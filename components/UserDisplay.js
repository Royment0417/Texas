import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserDisplay = ({ tournamentData }) => {
  const [timeLeft, setTimeLeft] = useState(tournamentData.countdown);

  // 倒计时逻辑
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 格式化时间显示
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>用户端</Text>
      
      <View style={styles.infoCard}>
        <Text style={styles.label}>倒计时:</Text>
        <Text style={styles.value}>{formatTime(timeLeft)}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>比赛名称:</Text>
        <Text style={styles.value}>{tournamentData.tournamentName}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>级别:</Text>
        <Text style={styles.value}>{tournamentData.level}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>人数:</Text>
        <Text style={styles.value}>{tournamentData.playerCount}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>总金额:</Text>
        <Text style={styles.value}>¥{tournamentData.totalPrize.toFixed(2)}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>平均金额:</Text>
        <Text style={styles.value}>¥{tournamentData.averagePrize.toFixed(2)}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>盲注:</Text>
        <Text style={styles.value}>{tournamentData.smallBlind}/{tournamentData.bigBlind}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>下一级别:</Text>
        <Text style={styles.value}>{tournamentData.nextLevel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default UserDisplay;