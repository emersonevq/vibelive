import React, { useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import MediaSelector from './MediaSelector';
import StoryEditor from './StoryEditor';
import type { Background, StoryComposition } from './types';

interface Props {
  visible: boolean;
  onClose: () => void;
  onPublish: (composition: StoryComposition) => void;
}

type Step = 'select' | 'edit';

export default function StoryCreator({ visible, onClose, onPublish }: Props) {
  const [step, setStep] = useState<Step>('select');
  const [bg, setBg] = useState<Background | null>(null);

  const handleSelect = (b: Background) => {
    setBg(b);
    setStep('edit');
  };

  const close = () => {
    setStep('select');
    setBg(null);
    onClose();
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={close}>
      <View style={styles.container}>
        {step === 'select' && <MediaSelector onSelect={handleSelect} onCancel={close} />}
        {step === 'edit' && bg && (
          <StoryEditor
            initialBackground={bg}
            onClose={close}
            onPublish={(c) => {
              onPublish(c);
              close();
            }}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
});
