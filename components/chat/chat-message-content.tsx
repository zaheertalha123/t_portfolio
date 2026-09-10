"use client";

import type { ReactNode } from "react";
import type { UIMessage } from "ai";

export function getMessageText(message: UIMessage): string {
  try {
    const parts = (message as { parts?: Array<{ type: string; text?: string }> })
      .parts;
    return (
      parts
        ?.filter((p) => p && p.type === "text" && typeof p.text === "string")
        .map((p) => p.text as string)
        .join("") ?? ""
    );
  } catch {
    return "";
  }
}

const INLINE_TOKEN =
  /(\*\*[^*]+?\*\*|__[^_]+?__|`[^`]+?`|\*[^*]+?\*|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let tokenIndex = 0;

  INLINE_TOKEN.lastIndex = 0;
  while ((match = INLINE_TOKEN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-${tokenIndex++}`;

    if (token.startsWith("**") || token.startsWith("__")) {
      nodes.push(
        <strong key={key} className="font-semibold text-zinc-100">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key}
          className="rounded bg-black/40 px-1 py-0.5 text-[0.85em] text-cyan-200"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("[")) {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        nodes.push(
          <a
            key={key}
            href={link[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline underline-offset-2"
          >
            {link[1]}
          </a>
        );
      } else {
        nodes.push(token);
      }
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderMultiline(text: string, keyPrefix: string): ReactNode[] {
  const lines = text.split("\n");
  return lines.flatMap((line, index) => {
    const content = renderInline(line, `${keyPrefix}-${index}`);
    if (index < lines.length - 1) {
      return [...content, <br key={`${keyPrefix}-br-${index}`} />];
    }
    return content;
  });
}

type TextBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; intro?: string; items: string[] };

function isListLine(line: string) {
  return /^\s*(?:[-*+]|\d+\.)\s+/.test(line);
}

function stripListMarker(line: string) {
  return line.replace(/^\s*(?:[-*+]|\d+\.)\s+/, "").trim();
}

function toBlock(text: string): TextBlock {
  const trimmed = text.trim();
  const lines = trimmed.split("\n");
  const listLines = lines.filter((line) => isListLine(line));

  if (listLines.length > 0 && listLines.length >= Math.ceil(lines.length / 2)) {
    const intro: string[] = [];
    const items: string[] = [];
    for (const line of lines) {
      if (isListLine(line)) {
        items.push(stripListMarker(line));
      } else if (items.length === 0) {
        intro.push(line.trim());
      } else if (line.trim()) {
        items[items.length - 1] += ` ${line.trim()}`;
      }
    }
    if (items.length > 0) {
      return {
        type: "list",
        intro: intro.join(" ").trim() || undefined,
        items,
      };
    }
  }

  const inlineParts = trimmed.split(/(?:^|\s)-\s+(?=\*\*|__)/);
  if (inlineParts.length > 1) {
    const intro = inlineParts[0].trim();
    const items = inlineParts
      .slice(1)
      .map((item) => item.trim())
      .filter(Boolean);
    if (items.length > 0) {
      return {
        type: "list",
        intro: intro || undefined,
        items,
      };
    }
  }

  return { type: "paragraph", text: trimmed };
}

export function ChatMessageContent({ text }: { text: string }) {
  if (!text.trim()) return null;

  const blocks = text
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map(toBlock);

  return (
    <div className="text-sm leading-relaxed space-y-2">
      {blocks.map((block, index) => {
        if (block.type === "list") {
          return (
            <div key={index} className="space-y-1.5">
              {block.intro ? (
                <p>{renderMultiline(block.intro, `intro-${index}`)}</p>
              ) : null}
              <ul className="list-disc space-y-1 pl-4 marker:text-cyan-400/80">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {renderMultiline(item, `item-${index}-${itemIndex}`)}
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return <p key={index}>{renderMultiline(block.text, `p-${index}`)}</p>;
      })}
    </div>
  );
}
