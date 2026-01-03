import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = forwardRef(({ initialValue }, ref) => {
  const editorRef = useRef(null);

  // বাইরের ফাইল থেকে getContent() কল করার অনুমতি দিচ্ছে
  useImperativeHandle(ref, () => ({
    getContent: () => {
      return editorRef.current ? editorRef.current.getContent() : '';
    }
  }));

  return (
    <Editor
      // এখান থেকেই আমরা লোকাল (GPL) ভার্সন লোড করছি
      tinymceScriptSrc="/tinymce/tinymce.min.js"

      onInit={(_evt, editor) => editorRef.current = editor}
      initialValue={initialValue}
      // onEditorChange={onChange}

      init={{
        width: '100%',
        height: 500,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',

        // TinyMCE 7+ এর জন্য এই লাইনটি খুব গুরুত্বপূর্ণ
        license_key: 'gpl',

        // স্কিন এবং কন্টেন্ট স্টাইল লোকালি লোড করার কনফিগারেশন
        skin: 'oxide-dark', // অথবা 'oxide-dark' ডার্ক মোডের জন্য
        content_css: 'dark',
        // এই অংশটি আপনার সমস্যা সমাধান করবে

        // ১. ডিরেকশন একদম ফিক্স করা
        directionality: 'ltr',

        // ২. কার্সারকে বামে রাখতে এবং টাইপিং স্টাইল ঠিক করতে
        content_style: `
    html, body { 
      direction: ltr !important; 
      text-align: left !important; 
      margin: 0;
      padding: 10px 20px !important; 
      color: white !important; 
    }
    p { margin: 0; text-align: left !important; }
  `,
        // ৪. ফোর্সড রি-রেন্ডার (এটি কার্সার ফিক্স করবে)
        setup: (editor) => {
          editor.on('init', () => {
            // এডিটরের ভেতরের এলিমেন্টকে ম্যানুয়ালি LTR সেট করা
            const body = editor.getBody();
            body.style.direction = 'ltr';
            body.style.textAlign = 'left';
          });
        },
        // টুলবার থেকে "Upgrade" বাটন সরাতে চাইলে এটি দিন
        promotion: false,
        branding: false,
        visual: false,
      }}
    />
  );
});

export default TextEditor;