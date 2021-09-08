import type { VNode, Slot } from 'vue-demi'

function *traverseNode(node: object): Iterator<VNode | null> {
  yield node.el
  for (let child of node.children) {
    yield *traverseNode(child)
  }
}

/**
 * returns whether slot content is passed from parent scope
 * @param {Slot} slot 
 * @returns {boolean}
 */
export const hasSlotContent = (slot?: Slot): boolean => {
  if (!slot) {
    return false
  }
  const vnode = slot()
  if (!vnode.__v_isVNode) {
    return false
  }
  return [...traverseNode(vnode)].some(v => v)
}
