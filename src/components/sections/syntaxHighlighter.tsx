import React from "react";

export type TokenType =
  | "comment"
  | "string"
  | "keyword"
  | "control"
  | "type"
  | "function"
  | "number"
  | "variable"
  | "operator"
  | "plain";

interface Token {
  type: TokenType;
  text: string;
}

const CONTROL_KEYWORDS = new Set(["if", "else", "for", "while", "return", "switch", "case", "break", "continue"]);
const KEYWORDS = new Set(["const", "let", "var", "function", "interface", "type", "class", "export", "import", "from", "default", "new", "true", "false", "null", "undefined"]);
const TYPES = new Set(["string", "number", "boolean", "void", "any", "Problem", "Record"]);

export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const n = line.length;

  while (i < n) {
    // Comments
    if (line.slice(i, i + 2) === "//" || line.slice(i, i + 2) === "/*" || line[i] === "*") {
      tokens.push({ type: "comment", text: line.slice(i) });
      break;
    }

    // Strings
    if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
      const quote = line[i];
      let j = i + 1;
      while (j < n && line[j] !== quote) {
        if (line[j] === "\\" && j + 1 < n) j += 2;
        else j++;
      }
      tokens.push({ type: "string", text: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Numbers
    if (/\d/.test(line[i])) {
      let j = i;
      while (j < n && /[\d.]/.test(line[j])) j++;
      tokens.push({ type: "number", text: line.slice(i, j) });
      i = j;
      continue;
    }

    // Identifiers & Keywords
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < n && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);

      if (CONTROL_KEYWORDS.has(word)) {
        tokens.push({ type: "control", text: word });
      } else if (KEYWORDS.has(word)) {
        tokens.push({ type: "keyword", text: word });
      } else if (TYPES.has(word)) {
        tokens.push({ type: "type", text: word });
      } else if (j < n && line[j] === "(") {
        tokens.push({ type: "function", text: word });
      } else {
        tokens.push({ type: "variable", text: word });
      }
      i = j;
      continue;
    }

    // Operators & Punctuation
    tokens.push({ type: "operator", text: line[i] });
    i++;
  }

  return tokens;
}

export function renderHighlightedLine(line: string): React.ReactNode {
  const tokens = tokenizeLine(line);
  return tokens.map((token, idx) => {
    let color = "#d4d4d4"; // default plain
    switch (token.type) {
      case "comment":
        color = "#6a9955"; // VS Code comment green
        break;
      case "string":
        color = "#ce9178"; // VS Code string peach
        break;
      case "keyword":
        color = "#569cd6"; // VS Code keyword blue
        break;
      case "control":
        color = "#c586c0"; // VS Code control purple
        break;
      case "type":
        color = "#4ec9b0"; // VS Code type teal
        break;
      case "function":
        color = "#dcdcaa"; // VS Code function yellow
        break;
      case "number":
        color = "#b5cea8"; // VS Code number light green
        break;
      case "operator":
        color = "#d4d4d4";
        break;
      case "variable":
        color = "#9cdcfe"; // VS Code variable cyan
        break;
    }

    return (
      <span key={idx} style={{ color }}>
        {token.text}
      </span>
    );
  });
}
