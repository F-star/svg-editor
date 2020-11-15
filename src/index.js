import Editor from './editor.js'
import AddRect from './modules/addRect.js'

const editor = new Editor()

// register tools
editor.registerTool(new AddRect())


editor.setTool('addRect')

/**
 * const editorBuilder = new Editor.builder()
 * editorBuilder
 *   .setCanvasSize(400, 300)
 *   .setStageSize(1000, 800)
 *   .setViewportSize(800, 500)
 *   .setZoom(100)
 * 
 * const editor = editorBuilder.build()
 * editor.registerTool(toolMove)
 * 
 */