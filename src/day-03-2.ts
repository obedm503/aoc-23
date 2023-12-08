const lines: string[] = [];
for await (const line of console) {
  if (line) {
    lines.push(line);
  }
}

type NumberNode = {
  type: "number";
  value: number;
  line: string;
  lineIndex: number;
  startIndex: number;
  endIndex: number;
};
type StarNode = { type: "star"; lineIndex: number; charIndex: number };
type Node = NumberNode | StarNode;
const nodes: Array<Node> = [];

for (let row = 0; row < lines.length; row++) {
  const line = lines[row];
  if (!line) {
    continue;
  }

  for (let col = 0; col < line.length; col++) {
    const char = line[col];

    if (char === "*") {
      nodes.push({ type: "star", lineIndex: row, charIndex: col });
      continue;
    }

    if (char && char !== "." && isDigit(char)) {
      const endIndex = getNumber(line, col);
      const value = parseInt(line.slice(col, endIndex + 1));
      nodes.push({
        type: "number",
        value,
        lineIndex: row,
        startIndex: col,
        endIndex,
        line,
      });
      col = endIndex;
    }
  }
}

function isDigit(char: string) {
  return !Number.isNaN(parseInt(char));
}

function getNumber(line: string, col: number): number {
  for (let i = col; i < line.length; i++) {
    if (!isDigit(line[i + 1])) {
      return i;
    }
  }

  return col;
}

function isAdjecent(left: Node, right: Node) {
  if (left.type === "number" && right.type === "star") {
    if (left.lineIndex === right.lineIndex) {
      return left.endIndex + 1 === right.charIndex;
    }

    return (
      right.charIndex >= left.startIndex - 1 &&
      right.charIndex <= left.endIndex + 1
    );
  }

  if (left.type === "star" && right.type === "number") {
    if (left.lineIndex === right.lineIndex) {
      return left.charIndex === right.startIndex - 1;
    }

    return (
      left.charIndex >= right.startIndex - 1 &&
      left.charIndex <= right.endIndex + 1
    );
  }

  return false;
}

function getLeftNodes(index: number, node: Node) {
  const foundNodes = [] as NumberNode[];
  const prevLineIndex = node.lineIndex - 1;
  let i = index - 1;
  while (true) {
    const searchNode = nodes[i];

    if (!searchNode || searchNode.lineIndex < prevLineIndex) {
      break;
    }

    if (searchNode.type === "number" && isAdjecent(searchNode, node)) {
      foundNodes.push(searchNode);
    }

    i--;
  }

  return foundNodes;
}

function getRightNodes(index: number, node: Node) {
  const foundNodes = [] as NumberNode[];
  const nextLineIndex = node.lineIndex + 1;
  let i = index + 1;
  while (true) {
    const searchNode = nodes[i];

    if (!searchNode || searchNode.lineIndex > nextLineIndex) {
      break;
    }

    if (searchNode.type === "number" && isAdjecent(node, searchNode)) {
      foundNodes.push(searchNode);
    }

    i++;
  }

  return foundNodes;
}

let total = 0;
for (let i = 0; i < nodes.length; i++) {
  const node = nodes[i];
  if (node.type !== "star") {
    continue;
  }

  const found = getLeftNodes(i, node).concat(getRightNodes(i, node));
  if (found.length === 2) {
    total += found[0].value * found[1].value;
  }
}

console.log(total);
