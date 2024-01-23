/**
 * 插入文本
 */
export const insertInputText = ({
  content,
  selection,
  range,
}: {
  content?: string;
  selection?: Selection;
  range?: Range;
}) => {
  if (!selection || !range || !content) {
    return;
  }
  if (selection.getRangeAt(0) && selection.rangeCount) {
    range.deleteContents();
    const el = document.createElement("div");
    const text = document.createTextNode(content);
    el.appendChild(text);
    const fragment = document.createDocumentFragment();
    let node;
    let lastNode;
    while ((node = el.firstChild)) {
      lastNode = fragment.appendChild(node);
    }
    range.insertNode(fragment);
    if (lastNode) {
      const newRange = range.cloneRange();
      if (!newRange) {
        return;
      }
      newRange.setStartAfter(lastNode);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
      alert("搞定");
    }
  }
};
