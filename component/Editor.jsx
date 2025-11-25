'use client';
import { useEffect } from "react";

export default function Editor({ content, setContent, uploadUrl }) {
  useEffect(() => {
    async function initEditor() {
      const tinymce = (await import("tinymce/tinymce")).default;

      // FREE plugins only
      await import("tinymce/icons/default");
      await import("tinymce/themes/silver");
      await import("tinymce/models/dom");
      await import("tinymce/plugins/advlist");
      await import("tinymce/plugins/anchor");
      await import("tinymce/plugins/autolink");
      await import("tinymce/plugins/autosave");
      await import("tinymce/plugins/charmap");
      await import("tinymce/plugins/code");
      await import("tinymce/plugins/codesample");
      await import("tinymce/plugins/directionality");
      await import("tinymce/plugins/emoticons");
      await import("tinymce/plugins/fullscreen");
      await import("tinymce/plugins/image");
      await import("tinymce/plugins/importcss");
      await import("tinymce/plugins/insertdatetime");
      await import("tinymce/plugins/link");
      await import("tinymce/plugins/lists");
      await import("tinymce/plugins/media");
      await import("tinymce/plugins/nonbreaking");
      await import("tinymce/plugins/pagebreak");
      await import("tinymce/plugins/preview");
      await import("tinymce/plugins/quickbars");
      await import("tinymce/plugins/searchreplace");
      await import("tinymce/plugins/table");
      await import("tinymce/plugins/visualblocks");
      await import("tinymce/plugins/visualchars");
      await import("tinymce/plugins/wordcount");

      tinymce.init({
        selector: "#blog-editor",
        height: 500,
        plugins:
          "preview importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount quickbars emoticons codesample",
        toolbar:
          "undo redo | bold italic underline | blocks fontsizeinput | align numlist bullist | link image media | forecolor backcolor removeformat | table | code fullscreen preview",
        setup: (editor) => {
          editor.on("init", () => editor.setContent(content || ""));
          editor.on("change keyup", () => setContent(editor.getContent()));
        },
        images_upload_url: uploadUrl,
      });
    }

    initEditor();

    return () => {
      if (window.tinymce) window.tinymce.remove();
    };
  }, []);

  return <textarea id="blog-editor" />;
}