import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoryDraft } from './types';

const DRAFTS_KEY = 'story_drafts';
const MAX_DRAFTS = 10;

export const draftsStorage = {
  async saveDraft(draft: StoryDraft): Promise<void> {
    try {
      const drafts = await this.getAllDrafts();
      const existingIndex = drafts.findIndex((d) => d.id === draft.id);

      if (existingIndex >= 0) {
        drafts[existingIndex] = draft;
      } else {
        drafts.unshift(draft);
      }

      // Keep only the latest MAX_DRAFTS
      if (drafts.length > MAX_DRAFTS) {
        drafts.pop();
      }

      await AsyncStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    } catch (error) {
      console.error('Erro ao salvar rascunho:', error);
      throw error;
    }
  },

  async getDraft(id: string): Promise<StoryDraft | null> {
    try {
      const drafts = await this.getAllDrafts();
      return drafts.find((d) => d.id === id) || null;
    } catch (error) {
      console.error('Erro ao obter rascunho:', error);
      return null;
    }
  },

  async getAllDrafts(): Promise<StoryDraft[]> {
    try {
      const data = await AsyncStorage.getItem(DRAFTS_KEY);
      if (!data) return [];

      const drafts = JSON.parse(data) as StoryDraft[];
      // Convert date strings back to Date objects
      return drafts.map((draft) => ({
        ...draft,
        createdAt: new Date(draft.createdAt),
        lastModified: new Date(draft.lastModified),
      }));
    } catch (error) {
      console.error('Erro ao obter rascunhos:', error);
      return [];
    }
  },

  async deleteDraft(id: string): Promise<void> {
    try {
      const drafts = await this.getAllDrafts();
      const filtered = drafts.filter((d) => d.id !== id);
      await AsyncStorage.setItem(DRAFTS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Erro ao deletar rascunho:', error);
      throw error;
    }
  },

  async clearAllDrafts(): Promise<void> {
    try {
      await AsyncStorage.removeItem(DRAFTS_KEY);
    } catch (error) {
      console.error('Erro ao limpar rascunhos:', error);
      throw error;
    }
  },
};
