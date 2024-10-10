import { createSignal, onMount } from 'solid-js';
import { createEditor, $getRoot, $getSelection, EditorState, LexicalEditor, $createParagraphNode } from 'lexical';
import { registerDragonSupport } from '@lexical/dragon';
import { createEmptyHistoryState, registerHistory } from '@lexical/history';
import { HeadingNode, QuoteNode, registerRichText } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';

export type InitialEditorStateType =
  | null
  | string
  | EditorState
  | ((editor: LexicalEditor) => void);

const theme = {

};

const Editor = () => {
  const [editor, setEditor] = createSignal<LexicalEditor | null>(null);

  onMount(() => {
    const lexicalEditor = createEditor({
      namespace: 'MyEditor',
      editable: true,
      onError: (error) => console.error(error),
      theme,
    });

    setEditor(lexicalEditor);

    const rootElement = document.getElementById('editor');
    lexicalEditor.setRootElement(rootElement);

    mergeRegister(
      registerRichText(lexicalEditor),
      registerDragonSupport(lexicalEditor),
      registerHistory(lexicalEditor, createEmptyHistoryState(), 300),
    );
  });

  return (
    <div>
      <div id="editor" contentEditable={true} />
    </div>
  );
};

export default Editor;
