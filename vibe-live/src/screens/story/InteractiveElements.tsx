import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SectionList,
  Switch,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  MentionElement,
  LocationElement,
  PollElement,
  QuestionElement,
  CountdownElement,
  DateTimeElement,
} from './types';

interface InteractiveElementsProps {
  visible: boolean;
  onSelectMention: (mention: MentionElement) => void;
  onSelectLocation: (location: LocationElement) => void;
  onSelectPoll: (poll: PollElement) => void;
  onSelectQuestion: (question: QuestionElement) => void;
  onSelectCountdown: (countdown: CountdownElement) => void;
  onSelectDateTime: (dateTime: DateTimeElement) => void;
  onCancel: () => void;
}

export default function InteractiveElements({
  visible,
  onSelectMention,
  onSelectLocation,
  onSelectPoll,
  onSelectQuestion,
  onSelectCountdown,
  onSelectDateTime,
  onCancel,
}: InteractiveElementsProps) {
  const [activeTab, setActiveTab] = useState<
    'mention' | 'location' | 'poll' | 'question' | 'countdown' | 'datetime'
  >('mention');

  // Mention state
  const [mentionQuery, setMentionQuery] = useState('');
  const mockUsers = [
    { id: '1', name: 'Ana Silva' },
    { id: '2', name: 'Julia Oliveira' },
    { id: '3', name: 'Mariana Costa' },
    { id: '4', name: 'Roberto Silva' },
  ];
  const filteredUsers = mockUsers.filter((u) =>
    u.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  // Location state
  const [locationQuery, setLocationQuery] = useState('');
  const mockLocations = [
    { id: '1', name: 'São Paulo', lat: -23.5505, lon: -46.6333 },
    { id: '2', name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },
    { id: '3', name: 'Belo Horizonte', lat: -19.9191, lon: -43.9386 },
    { id: '4', name: 'Salvador', lat: -12.9789, lon: -38.5067 },
  ];
  const filteredLocations = mockLocations.filter((l) =>
    l.name.toLowerCase().includes(locationQuery.toLowerCase())
  );

  // Poll state
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['Opção 1', 'Opção 2']);

  // Question state
  const [questionText, setQuestionText] = useState('');

  // Countdown state
  const [countdownDate, setCountdownDate] = useState('');

  // DateTime format
  const [dateTimeFormat, setDateTimeFormat] = useState<'date' | 'time' | 'datetime'>('datetime');

  const handleAddMention = (user: typeof mockUsers[0]) => {
    const mention: MentionElement = {
      id: `mention-${Date.now()}`,
      type: 'mention',
      userId: user.id,
      userName: user.name,
      x: 0,
      y: 0,
    };
    onSelectMention(mention);
  };

  const handleAddLocation = (location: typeof mockLocations[0]) => {
    const loc: LocationElement = {
      id: `location-${Date.now()}`,
      type: 'location',
      name: location.name,
      latitude: location.lat,
      longitude: location.lon,
      x: 0,
      y: 0,
    };
    onSelectLocation(loc);
  };

  const handleCreatePoll = () => {
    if (pollQuestion.trim() && pollOptions.length >= 2) {
      const poll: PollElement = {
        id: `poll-${Date.now()}`,
        type: 'poll',
        question: pollQuestion,
        options: pollOptions.filter((o) => o.trim()),
        x: 0,
        y: 0,
      };
      onSelectPoll(poll);
      setPollQuestion('');
      setPollOptions(['Opção 1', 'Opção 2']);
    }
  };

  const handleCreateQuestion = () => {
    if (questionText.trim()) {
      const question: QuestionElement = {
        id: `question-${Date.now()}`,
        type: 'question',
        question: questionText,
        x: 0,
        y: 0,
      };
      onSelectQuestion(question);
      setQuestionText('');
    }
  };

  const handleCreateCountdown = () => {
    if (countdownDate.trim()) {
      const countdown: CountdownElement = {
        id: `countdown-${Date.now()}`,
        type: 'countdown',
        targetDate: countdownDate,
        x: 0,
        y: 0,
      };
      onSelectCountdown(countdown);
      setCountdownDate('');
    }
  };

  const handleAddDateTime = () => {
    const dateTime: DateTimeElement = {
      id: `datetime-${Date.now()}`,
      type: 'datetime',
      format: dateTimeFormat,
      x: 0,
      y: 0,
    };
    onSelectDateTime(dateTime);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Elementos Interativos</Text>
            <TouchableOpacity onPress={onCancel}>
              <MaterialCommunityIcons name="close" size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsScroll}
            contentContainerStyle={styles.tabs}
          >
            {[
              { id: 'mention', label: 'Menção', icon: 'at' },
              { id: 'location', label: 'Local', icon: 'map-marker' },
              { id: 'poll', label: 'Enquete', icon: 'chart-pie' },
              { id: 'question', label: 'Pergunta', icon: 'help-circle' },
              { id: 'countdown', label: 'Contagem', icon: 'timer' },
              { id: 'datetime', label: 'Data/Hora', icon: 'calendar-clock' },
            ].map((tab: any) => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, activeTab === tab.id && styles.tabActive]}
                onPress={() => setActiveTab(tab.id)}
              >
                <MaterialCommunityIcons
                  name={tab.icon}
                  size={16}
                  color={activeTab === tab.id ? '#fff' : '#16a34a'}
                />
                <Text style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView style={styles.contentScroll}>
            {/* Mention Tab */}
            {activeTab === 'mention' && (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Buscar usuário..."
                  placeholderTextColor="#9ca3af"
                  value={mentionQuery}
                  onChangeText={setMentionQuery}
                />
                {filteredUsers.map((user) => (
                  <TouchableOpacity
                    key={user.id}
                    style={styles.item}
                    onPress={() => {
                      handleAddMention(user);
                      onCancel();
                    }}
                  >
                    <View style={styles.itemAvatar}>
                      <MaterialCommunityIcons name="account" size={24} color="#fff" />
                    </View>
                    <Text style={styles.itemLabel}>{user.name}</Text>
                    <MaterialCommunityIcons name="chevron-right" size={20} color="#9ca3af" />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Location Tab */}
            {activeTab === 'location' && (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Buscar local..."
                  placeholderTextColor="#9ca3af"
                  value={locationQuery}
                  onChangeText={setLocationQuery}
                />
                {filteredLocations.map((location) => (
                  <TouchableOpacity
                    key={location.id}
                    style={styles.item}
                    onPress={() => {
                      handleAddLocation(location);
                      onCancel();
                    }}
                  >
                    <View style={styles.itemIcon}>
                      <MaterialCommunityIcons name="map-marker" size={24} color="#fff" />
                    </View>
                    <Text style={styles.itemLabel}>{location.name}</Text>
                    <MaterialCommunityIcons name="chevron-right" size={20} color="#9ca3af" />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Poll Tab */}
            {activeTab === 'poll' && (
              <View>
                <TextInput
                  style={[styles.input, { marginBottom: 12 }]}
                  placeholder="Pergunta da enquete..."
                  placeholderTextColor="#9ca3af"
                  value={pollQuestion}
                  onChangeText={setPollQuestion}
                />
                {pollOptions.map((option, index) => (
                  <TextInput
                    key={index}
                    style={[styles.input, { marginBottom: 8 }]}
                    placeholder={`Opção ${index + 1}`}
                    placeholderTextColor="#9ca3af"
                    value={option}
                    onChangeText={(text) => {
                      const newOptions = [...pollOptions];
                      newOptions[index] = text;
                      setPollOptions(newOptions);
                    }}
                  />
                ))}
                <TouchableOpacity
                  style={styles.addOptionButton}
                  onPress={() => setPollOptions([...pollOptions, ''])}
                >
                  <MaterialCommunityIcons name="plus" size={16} color="#16a34a" />
                  <Text style={styles.addOptionText}>Adicionar opção</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={() => {
                    handleCreatePoll();
                    onCancel();
                  }}
                >
                  <Text style={styles.createButtonText}>Criar Enquete</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Question Tab */}
            {activeTab === 'question' && (
              <View>
                <TextInput
                  style={[styles.input, { marginBottom: 12 }]}
                  placeholder="Faça uma pergunta..."
                  placeholderTextColor="#9ca3af"
                  value={questionText}
                  onChangeText={setQuestionText}
                  multiline
                />
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={() => {
                    handleCreateQuestion();
                    onCancel();
                  }}
                >
                  <Text style={styles.createButtonText}>Adicionar Pergunta</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Countdown Tab */}
            {activeTab === 'countdown' && (
              <View>
                <TextInput
                  style={[styles.input, { marginBottom: 12 }]}
                  placeholder="Data e hora (ex: 2024-12-31 23:59)"
                  placeholderTextColor="#9ca3af"
                  value={countdownDate}
                  onChangeText={setCountdownDate}
                />
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={() => {
                    handleCreateCountdown();
                    onCancel();
                  }}
                >
                  <Text style={styles.createButtonText}>Adicionar Contagem Regressiva</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* DateTime Tab */}
            {activeTab === 'datetime' && (
              <View>
                <Text style={styles.formatLabel}>Formato:</Text>
                <View style={styles.formatOptions}>
                  {[
                    { id: 'date', label: 'Data' },
                    { id: 'time', label: 'Hora' },
                    { id: 'datetime', label: 'Data e Hora' },
                  ].map((fmt: any) => (
                    <TouchableOpacity
                      key={fmt.id}
                      style={[
                        styles.formatButton,
                        dateTimeFormat === fmt.id && styles.formatButtonActive,
                      ]}
                      onPress={() => setDateTimeFormat(fmt.id)}
                    >
                      <Text
                        style={[
                          styles.formatButtonText,
                          dateTimeFormat === fmt.id && styles.formatButtonTextActive,
                        ]}
                      >
                        {fmt.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={() => {
                    handleAddDateTime();
                    onCancel();
                  }}
                >
                  <Text style={styles.createButtonText}>Adicionar Data/Hora</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  tabsScroll: {
    marginHorizontal: -16,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  tabs: {
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabActive: {
    backgroundColor: '#16a34a',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  tabLabelActive: {
    color: '#fff',
  },
  contentScroll: {
    marginBottom: 12,
    maxHeight: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 8,
  },
  itemAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 12,
  },
  addOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
    marginLeft: 6,
  },
  createButton: {
    backgroundColor: '#16a34a',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  createButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  formatLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  formatOptions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  formatButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  formatButtonActive: {
    backgroundColor: '#dcfce7',
    borderColor: '#16a34a',
  },
  formatButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  formatButtonTextActive: {
    color: '#16a34a',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
});
