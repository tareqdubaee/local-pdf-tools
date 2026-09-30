self.onmessage = async (event) => {
  const { preset, buffer } = event.data;
  const input = 'input.pdf';
  const output = 'output.pdf';
  let gs;
  try {
    const module = await import('https://cdn.jsdelivr.net/npm/@jspawn/ghostscript-wasm@0.0.2/gs.mjs');
    gs = await module.default({
      locateFile: (file) => 'https://cdn.jsdelivr.net/npm/@jspawn/ghostscript-wasm@0.0.2/' + file
    });
    gs.FS.writeFile(input, new Uint8Array(buffer));
    gs.callMain([
      '-sDEVICE=pdfwrite', '-dCompatibilityLevel=1.4', '-dPDFSETTINGS=/' + preset,
      '-dNOPAUSE', '-dQUIET', '-dBATCH', '-dDetectDuplicateImages=true',
      '-dCompressFonts=true', '-sOutputFile=' + output, input
    ]);
    const result = new Uint8Array(gs.FS.readFile(output, { encoding: 'binary' })).slice();
    try { gs.FS.unlink(input); } catch (_) {}
    try { gs.FS.unlink(output); } catch (_) {}
    self.postMessage({ ok: true, buffer: result.buffer }, [result.buffer]);
  } catch (error) {
    self.postMessage({ ok: false, error: error?.message || String(error) });
  }
};
