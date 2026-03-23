import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';

function MenuBar({ editor }) {
  if (!editor) return null;

  const btnClass = (active) =>
    `px-2 py-1 font-heading text-xs tracking-wider border border-mid-gray cursor-pointer transition-colors ${
      active ? 'bg-blood text-off-white border-blood' : 'bg-dark-gray text-light-gray hover:bg-mid-gray/30'
    }`;

  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-1 border-b-2 border-mid-gray" style={{ padding: '0.5rem' }}>
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))}>
        B
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))}>
        I
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive('underline'))}>
        U
      </button>
      <div className="w-px bg-mid-gray mx-1" />
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive('heading', { level: 1 }))}>
        H1
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))}>
        H2
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive('heading', { level: 3 }))}>
        H3
      </button>
      <div className="w-px bg-mid-gray mx-1" />
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))}>
        • List
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))}>
        1. List
      </button>
      <div className="w-px bg-mid-gray mx-1" />
      <button type="button" onClick={addLink} className={btnClass(editor.isActive('link'))}>
        🔗 Link
      </button>
      <button type="button" onClick={() => editor.chain().focus().unsetLink().run()} className={btnClass(false)} disabled={!editor.isActive('link')}>
        Unlink
      </button>
      <button type="button" onClick={addImage} className={btnClass(false)}>
        🖼 Image
      </button>
      <div className="w-px bg-mid-gray mx-1" />
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))}>
        " Quote
      </button>
      <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btnClass(false)}>
        — Line
      </button>
    </div>
  );
}

export default function RichTextEditor({ content, onUpdate }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { style: 'color:#C62828;text-decoration:underline' } }),
      Image.configure({ HTMLAttributes: { style: 'max-width:100%;height:auto;margin:16px 0;border-radius:4px' } }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none',
        style: 'min-height:300px;padding:1rem;color:#f5f5f0;font-size:16px;line-height:1.8',
      },
    },
  });

  return (
    <div className="border-2 border-mid-gray bg-black">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
