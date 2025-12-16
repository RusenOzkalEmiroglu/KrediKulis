import * as Papa from 'papaparse';

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
  return new Promise((resolve, reject) => {
    fetch(csvPath)
      .then((response) => {
        if (!response.ok) throw new Error('CSV dosyası okunamadı');
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText as string, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data: FonData[] = results.data.map((row: any) => ({
              fonKodu: row['Fon Kodu'],
              fonAdi: row['Fon Adı'],
              semsiyeFonTuru: row['Şemsiye Fon Türü'],
              birAyGetiri: parseFloat(row['1 Ay (%)']?.replace(',', '.') || '0'),
              ucAyGetiri: parseFloat(row['3 Ay (%)']?.replace(',', '.') || '0'),
              altiAyGetiri: parseFloat(row['6 Ay (%)']?.replace(',', '.') || '0'),
              yilbasiGetiri: parseFloat(row['Yılbaşı (%)']?.replace(',', '.') || '0'),
              birYilGetiri: parseFloat(row['1 Yıl (%)']?.replace(',', '.') || '0'),
              ucYilGetiri: row['3 Yıl (%)'] ? parseFloat(row['3 Yıl (%)'].replace(',', '.')) : null,
              besYilGetiri: row['5 Yıl (%)'] ? parseFloat(row['5 Yıl (%)'].replace(',', '.')) : null,
            }));
            resolve(data);
          },
          error: (err: Papa.ParseError) => reject(err),
        });
      })
      .catch(reject);
  });
}
