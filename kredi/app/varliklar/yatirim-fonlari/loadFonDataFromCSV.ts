export interface FonData {
  fonKodu: string;
  fonAdi: string;
  semsiyeFonTuru?: string;
  birAyGetiri: number;
  ucAyGetiri: number;
  altiAyGetiri: number;
  yilbasiGetiri: number;
  birYilGetiri: number;
  ucYilGetiri: number | null;
  besYilGetiri: number | null;
}

export async function loadFonDataFromCSV(csvPath: string): Promise<FonData[]> {
  try {
    const response = await fetch(csvPath);
    if (!response.ok) throw new Error('CSV dosyası okunamadı');
    const csvText = await response.text();

    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    // Helper to find index of a header
    const getIndex = (name: string) => headers.findIndex(h => h === name);

    const idxFonKodu = getIndex('Fon Kodu');
    const idxFonAdi = getIndex('Fon Adı');
    const idxSemsiye = getIndex('Şemsiye Fon Türü');
    const idx1Ay = getIndex('1 Ay (%)');
    const idx3Ay = getIndex('3 Ay (%)');
    const idx6Ay = getIndex('6 Ay (%)');
    const idxYilbasi = getIndex('Yılbaşı (%)');
    const idx1Yil = getIndex('1 Yıl (%)');
    const idx3Yil = getIndex('3 Yıl (%)');
    const idx5Yil = getIndex('5 Yıl (%)');

    const data: FonData[] = [];

    for (let i = 1; i < lines.length; i++) {
      // Basic CSV splitting handling quotes
      const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
      // If regex match fails or simple split is needed:
      // const row = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
      
      // Better split that respects quotes roughly (for this simple case)
      // A robust manual parser would be longer, but for this specific data structure:
      const rawRow = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      const cleanRow = rawRow.map(c => c.trim().replace(/^"|"$/g, ''));

      if (cleanRow.length < headers.length) continue;

      const parseNum = (val: string) => parseFloat(val?.replace(',', '.') || '0');

      data.push({
        fonKodu: cleanRow[idxFonKodu] || '',
        fonAdi: cleanRow[idxFonAdi] || '',
        semsiyeFonTuru: cleanRow[idxSemsiye] || '',
        birAyGetiri: parseNum(cleanRow[idx1Ay]),
        ucAyGetiri: parseNum(cleanRow[idx3Ay]),
        altiAyGetiri: parseNum(cleanRow[idx6Ay]),
        yilbasiGetiri: parseNum(cleanRow[idxYilbasi]),
        birYilGetiri: parseNum(cleanRow[idx1Yil]),
        ucYilGetiri: idx3Yil > -1 ? parseNum(cleanRow[idx3Yil]) : null,
        besYilGetiri: idx5Yil > -1 ? parseNum(cleanRow[idx5Yil]) : null,
      });
    }

    return data;
  } catch (error) {
    console.error('CSV yükleme hatası:', error);
    return [];
  }
}
