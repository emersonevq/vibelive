import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import StoryEditor from './StoryEditor';
import MediaSelector from './MediaSelector';
import useStoryEditor from '../hooks/useStoryEditor';
import useHistoryManager from '../hooks/useHistoryManager';
import { saveDraft, loadDraft } from '../utils/storageHelpers';

export default function StoryCreator() {
  const editor = useStoryEditor();
  const history = useHistoryManager(editor.state);

  useEffect(() => {
    // sync editor state to history
    history.reset(editor.state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // whenever editor state changes, push to history
    history.set(editor.state);
  }, [editor.state]);

  const handlePick = useCallback((media) => {
    if (media) editor.addMedia(media);
  }, [editor]);

  const handleSaveDraft = useCallback(async () => {
    await saveDraft('story-draft', editor.state);
  }, [editor.state]);

  const handleLoadDraft = useCallback(async () => {
    const d = await loadDraft('story-draft');
    if (d) editor.setState(d);
  }, [editor]);

  return (
    <View style={styles.container}>
      <MediaSelector onPick={handlePick} />
      <View style={{ flex: 1 }}>
        <StoryEditor value={editor.state} onChange={(s) => editor.setState(s)} />
      </View>

      <View style={styles.controls}>
        <Button title="Undo" onPress={() => { history.undo(); const p = history.present; editor.setState(p); }} />
        <Button title="Redo" onPress={() => { history.redo(); const p = history.present; editor.setState(p); }} />
        <Button title="Save" onPress={handleSaveDraft} />
        <Button title="Load" onPress={handleLoadDraft} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, controls: { flexDirection: 'row', justifyContent: 'space-around', padding: 8 } });
