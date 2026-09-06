import React from 'react';
import { parseFormSheet, splitLabel } from '../../utils/formSheetParser.js';

function renderInline(text, keyPrefix) {
  const nodes = [];
  const regex = /(_{3,})|(\[\s{0,4}\])/g;
  let lastIndex = 0;
  let match;
  let n = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <React.Fragment key={`${keyPrefix}-t${n++}`}>{text.slice(lastIndex, match.index)}</React.Fragment>
      );
    }
    if (match[1]) {
      const width = Math.min(300, Math.max(48, match[1].length * 5.5));
      nodes.push(
        <span
          key={`${keyPrefix}-b${n++}`}
          className="inline-block align-bottom border-b-[1.5px] border-slate-400 mx-1"
          style={{ width: `${width}px`, height: '13px' }}
        />
      );
    } else {
      nodes.push(
        <span
          key={`${keyPrefix}-c${n++}`}
          className="inline-block w-3.5 h-3.5 border-[1.5px] border-slate-500 rounded-[3px] align-middle mx-1 -mb-0.5 bg-white shrink-0"
        />
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(<React.Fragment key={`${keyPrefix}-t${n++}`}>{text.slice(lastIndex)}</React.Fragment>);
  }

  return nodes;
}

function renderLabelled(text, keyPrefix, { forceLabel = false } = {}) {
  const split = splitLabel(text, { forceLabel });
  if (!split) return renderInline(text, keyPrefix);
  return (
    <>
      <span className="font-semibold text-slate-700">{split.label}:</span>{' '}
      {renderInline(split.rest, `${keyPrefix}-r`)}
    </>
  );
}

export default function FormattedRecordSheet({ text }) {
  const blocks = parseFormSheet(text);

  return (
    <div className="text-[12.5px] text-slate-800">
      {blocks.map((block, idx) => {
        const key = `blk-${idx}`;
        switch (block.type) {
          case 'blank':
            return <div key={key} className="h-2" />;

          case 'subtitle':
            return (
              <div
                key={key}
                className="mb-4 px-3 py-2 bg-sky-50 border border-sky-200 rounded-lg text-[12px] font-semibold text-sky-800"
              >
                {renderInline(block.text, key)}
              </div>
            );

          case 'header':
            return (
              <div key={key} className="mt-5 mb-2 first:mt-0">
                <div className="flex items-center gap-2">
                  {block.num && (
                    <span className="flex items-center justify-center w-5 h-5 rounded bg-[#0284c7] text-white text-[10px] font-black shrink-0">
                      {block.num}
                    </span>
                  )}
                  <h4 className="text-[12px] font-black text-slate-900 tracking-wide uppercase">
                    {block.text}
                  </h4>
                </div>
                <div className="h-px bg-slate-200 mt-1.5" />
              </div>
            );

          case 'field':
            return (
              <div key={key} className="flex items-baseline gap-1.5 py-1">
                <span className="w-1 h-1 rounded-full bg-sky-500 shrink-0 relative top-[-2px]" />
                <span className="flex-1">{renderLabelled(block.text, key, { forceLabel: true })}</span>
              </div>
            );

          case 'subfield':
            return (
              <div key={key} className="flex items-baseline gap-1.5 py-1 pl-5 text-slate-700">
                <span className="text-slate-400 shrink-0">–</span>
                <span className="flex-1">{renderLabelled(block.text, key, { forceLabel: true })}</span>
              </div>
            );

          case 'checkbox':
            return (
              <div key={key} className="py-1">
                {renderLabelled(block.text, key)}
              </div>
            );

          case 'subcheckbox':
            return (
              <div key={key} className="py-1 pl-3">
                {renderInline(block.text, key)}
              </div>
            );

          case 'writeline':
            return <div key={key} className="border-b border-slate-300 h-6 my-0.5" />;

          case 'table':
            return (
              <div key={key} className="my-3 overflow-x-auto">
                <table className="w-full border-collapse text-[11.5px]">
                  <thead>
                    <tr>
                      {block.header.map((h, ci) => (
                        <th
                          key={ci}
                          className="border border-slate-300 bg-slate-100 px-2 py-1.5 text-left font-bold text-slate-700"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci} className="border border-slate-300 px-2 py-1.5 align-top">
                            {renderInline(cell, `${key}-${ri}-${ci}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'paragraph':
          default:
            return (
              <p key={key} className="py-1 text-slate-700 leading-relaxed">
                {renderLabelled(block.text, key)}
              </p>
            );
        }
      })}
    </div>
  );
}
