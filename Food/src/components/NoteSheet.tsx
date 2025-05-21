import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { Text, TextInput, Button, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Mood } from '../types/mood';

export type NoteSheetHandle = {
  open: (mood: Mood) => void;
};

const NoteSheet = forwardRef<NoteSheetHandle, { onSave: (m: Mood, n: string) => void }>(
  ({ onSave }, ref) => {
    const [mood, setMood] = useState<Mood>('happy');
    const [note, setNote] = useState('');
    const modalRef = React.useRef<Modalize>(null);

    useImperativeHandle(ref, () => ({
      open: (m) => {
        setMood(m);
        setNote('');
        modalRef.current?.open();
      },
    }));

    return (
      <Modalize
        ref={modalRef}
        adjustToContentHeight
        handlePosition="inside"
        handleStyle={{ backgroundColor: '#d1d5db' }}
        modalStyle={{
          backgroundColor: 'white',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
            Why do you feel {mood} today?
          </Text>
          <TextInput
            placeholder="One-line note (e.g., Slept well / Stressful exam …)"
            value={note}
            onChangeText={setNote}
            style={{
              borderWidth: 1,
              borderColor: '#d1d5db',
              borderRadius: 8,
              padding: 10,
              marginBottom: 16,
            }}
          />
          <Button
            title="Save"
            onPress={() => {
              modalRef.current?.close();
              onSave(mood, note.trim());
            }}
          />
        </View>
      </Modalize>
    );
  }
);

export default NoteSheet; 