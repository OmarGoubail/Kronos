import { createEffect, createSignal, onMount } from "solid-js";
import {
	createEditor,
	$getRoot,
	$getSelection,
	type EditorState,
	type LexicalEditor,
	$createParagraphNode,
} from "lexical";
import { registerDragonSupport } from "@lexical/dragon";
import { createEmptyHistoryState, registerHistory } from "@lexical/history";
import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { mergeRegister } from "@lexical/utils";
import { LinkNode } from "@lexical/link";

import {
	$convertFromMarkdownString,
	$convertToMarkdownString,
	registerMarkdownShortcuts,
	TRANSFORMERS,
} from "@lexical/markdown";
import { kronosTheme } from "./theme";

export type InitialEditorStateType =
	| null
	| string
	| EditorState
	| ((editor: LexicalEditor) => void);

const Editor = () => {
	const [editor, setEditor] = createSignal<LexicalEditor | null>(null);

	onMount(() => {
		const lexicalEditor = createEditor({
			namespace: "MyEditor",
			editable: true,
			onError: (error) => console.error(error),
			theme: kronosTheme,
			nodes: [
				HeadingNode,
				QuoteNode,
				ListNode,
				ListItemNode,
				CodeNode,
				LinkNode,
			],
		});

		setEditor(lexicalEditor);

		const rootElement = document.getElementById("editor");
		lexicalEditor.setRootElement(rootElement);

		mergeRegister(
			registerRichText(lexicalEditor),
			registerDragonSupport(lexicalEditor),
			registerHistory(lexicalEditor, createEmptyHistoryState(), 300),
			registerMarkdownShortcuts(lexicalEditor, TRANSFORMERS),
		);

		lexicalEditor.update(() => {
			$convertFromMarkdownString(
				"# Welcome to Markdown\n\nThis is a paragraph.",
				TRANSFORMERS,
			);
		});
	});

	return (
		<div class="p-20">
			<div id="editor" contentEditable={true} />
		</div>
	);
};

export default Editor;
