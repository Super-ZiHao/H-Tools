import { editor } from 'monaco-editor'
import { ref, nextTick, onBeforeUnmount } from 'vue'
const DEFAULT_EDITOR_OPTION: editor.IStandaloneEditorConstructionOptions = {
  
};
function useMonacoEditor(editorOption: editor.IStandaloneEditorConstructionOptions = DEFAULT_EDITOR_OPTION) {
  // 编辑器示例
  const monacoEditor = ref<editor.IStandaloneCodeEditor | null>(null)
  // 目标元素
  const monacoEditorRef = ref<HTMLElement | null>(null)

  /** 创建实例初始化 */
  function createEditor() {
    if(!monacoEditorRef.value) return
    monacoEditor.value = editor.create(monacoEditorRef.value, {
      // 初始模型
      model: editor.createModel('', editorOption.language),
      // 是否启用预览图
      minimap: { enabled: true },
      // 主题
      // theme: 
      // 主键
      multiCursorModifier: 'ctrlCmd',
      // 滚动条
      scrollbar: {
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8
      },
      // 行号
      lineNumbers: 'on',
      // tab大小
      tabSize: 2,
      //字体大小
      fontSize: 16,
      // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
      autoIndent: 'advanced',
      // 自动布局
      automaticLayout: true,
      language: editorOption.language,
      renderLineHighlight: "gutter",
      folding: true, // 是否折叠
      roundedSelection: false,
      foldingHighlight: true, // 折叠等高线
      foldingStrategy: "indentation", // 折叠方式  auto | indentation
      showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
      disableLayerHinting: true, // 等宽优化
      emptySelectionClipboard: false, // 空选择剪切板
      selectionClipboard: false, // 选择剪切板
      codeLens: true, // 代码镜头
      scrollBeyondLastLine: false,
      colorDecorators: true, // 颜色装饰器
      accessibilitySupport: "on", // 辅助功能支持  "auto" | "off" | "on"
      lineNumbersMinChars: 5, // 行号最小字符   number
      ...editorOption
    })
    return monacoEditor
  }

  // 格式化
  async function formatDoc() {
    await monacoEditor.value?.getAction('editor.action.formatDocument')?.run()
  }

  // 数据更新
  function updateVal(val: string) {
    nextTick(() => {
      if(getOption(editor.EditorOption.readOnly)) {
        updateOptions({ readOnly: false })
      }
      monacoEditor.value?.setValue(val)
      setTimeout(async () => {
        await formatDoc()
      }, 10)
    })
  }

  // 配置更新
  function updateOptions(opt: editor.IStandaloneEditorConstructionOptions) {
    monacoEditor.value?.updateOptions(opt)
  }

  // 获取配置
  function getOption(name: editor.EditorOption) {
    return monacoEditor.value?.getOption(name)
  }

  // 页面离开 销毁
  onBeforeUnmount(() => {
    if(monacoEditor) {
      monacoEditor.value?.dispose()
    }
  })

  return {
    monacoEditorRef,
    monacoEditor,
    createEditor,
    updateVal,
    updateOptions,
    getOption,
    formatDoc
  }
}

export default useMonacoEditor;