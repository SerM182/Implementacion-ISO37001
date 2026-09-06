/**
 * Convierte el texto semi-estructurado de las plantillas de registros
 * (secciones numeradas, campos "• Label: ____", casilleros "[  ]", tablas
 * con "|" y líneas de firma) en una lista de bloques tipados, para poder
 * renderizarlos como un formulario prolijo en vez de texto monoespaciado.
 */

function isTableLine(line) {
  return (line.match(/\|/g) || []).length >= 2;
}

function isSeparatorRow(line) {
  return /^[\s\-|]+$/.test(line) && line.includes('-');
}

function isWriteline(line) {
  return /^_{10,}$/.test(line);
}

function isDivider(line) {
  return /^-{10,}$/.test(line);
}

function isHeader(line) {
  if (!line.endsWith(':')) return false;
  if (line !== line.toUpperCase()) return false;
  if (!/[A-ZÁÉÍÓÚÑÜ]{3,}/.test(line)) return false;
  return true;
}

export function looksLikeFieldLine(text) {
  const idx = text.indexOf(':');
  if (idx === -1 || idx > 45) return false;
  const rest = text.slice(idx + 1).trim();
  return rest === '' || rest.length <= 3 || /^[_[]/.test(rest);
}

export function splitLabel(text, { forceLabel = false } = {}) {
  const idx = text.indexOf(':');
  if (idx === -1) return null;
  if (!forceLabel && !looksLikeFieldLine(text)) return null;
  return { label: text.slice(0, idx), rest: text.slice(idx + 1) };
}

export function parseFormSheet(rawText) {
  const lines = String(rawText || '').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      blocks.push({ type: 'blank' });
      i++;
      continue;
    }

    if (isTableLine(line)) {
      const tableLines = [];
      while (i < lines.length && (isTableLine(lines[i].trim()) || isSeparatorRow(lines[i].trim()))) {
        tableLines.push(lines[i].trim());
        i++;
      }
      const dataRows = tableLines.filter((l) => !isSeparatorRow(l));
      if (dataRows.length > 0) {
        const header = dataRows[0].split('|').map((c) => c.trim());
        const rows = dataRows.slice(1).map((r) => r.split('|').map((c) => c.trim()));
        blocks.push({ type: 'table', header, rows });
      }
      continue;
    }

    if (isWriteline(line)) {
      blocks.push({ type: 'writeline' });
      i++;
      continue;
    }

    if (isDivider(line)) {
      i++;
      continue;
    }

    if (isHeader(line)) {
      const m = line.match(/^(\d{1,2})\.\s*(.*)$/);
      blocks.push({ type: 'header', num: m ? m[1] : null, text: m ? m[2] : line });
      i++;
      continue;
    }

    if (/^[a-z]\)\s*/.test(line)) {
      blocks.push({ type: 'subcheckbox', text: line });
      i++;
      continue;
    }

    if (/^-\s+/.test(line)) {
      blocks.push({ type: 'subfield', text: line.replace(/^-\s+/, '') });
      i++;
      continue;
    }

    if (line.startsWith('•')) {
      blocks.push({ type: 'field', text: line.replace(/^•\s*/, '') });
      i++;
      continue;
    }

    if (line.includes('[') && line.includes(']')) {
      blocks.push({ type: 'checkbox', text: line });
      i++;
      continue;
    }

    if (blocks.every((b) => b.type === 'blank')) {
      blocks.push({ type: 'subtitle', text: line });
      i++;
      continue;
    }

    blocks.push({ type: 'paragraph', text: line });
    i++;
  }

  while (blocks.length && blocks[0].type === 'blank') blocks.shift();
  while (blocks.length && blocks[blocks.length - 1].type === 'blank') blocks.pop();

  // Los renglones de prosa se cortan cada ~90 caracteres solo por el ancho
  // monoespaciado original: se fusionan en un párrafo fluido, salvo listas
  // numeradas u objetivos, que deben permanecer como ítems separados.
  const merged = [];
  for (const block of blocks) {
    const prev = merged[merged.length - 1];
    const isPlainProse =
      block.type === 'paragraph' &&
      !/^\d{1,2}\./.test(block.text) &&
      !/^OBJETIVO/i.test(block.text) &&
      !looksLikeFieldLine(block.text);
    const prevIsPlainProse =
      prev &&
      prev.type === 'paragraph' &&
      !/^\d{1,2}\./.test(prev.text) &&
      !/^OBJETIVO/i.test(prev.text) &&
      !looksLikeFieldLine(prev.text);

    if (isPlainProse && prevIsPlainProse) {
      prev.text = `${prev.text} ${block.text}`;
    } else {
      merged.push({ ...block });
    }
  }

  return merged;
}
