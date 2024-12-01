"use client"
import { Editor } from '@toast-ui/react-editor'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { useRef } from 'react'
import { toast } from 'react-toastify'
export default function WysiwygEditor() {
    const editorRef = useRef(null)
    const toolbarItems = [['heading', 'bold', 'italic', 'strike'], ['hr'], ['ul', 'ol', 'task'], ['table', 'link'], ['image'], ['code'], ['scrollSync']]

    return (
        <Editor
            ref={editorRef}
            initialValue=''
            placeholder='글을 작성해주세요!'
            initialEditType='markdown'
            height='60rem'
            theme={'dark'}
            toolbarItems={toolbarItems}
            plugins={[colorSyntax]}
        />
    )
}