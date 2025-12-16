'use client'

import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Search, Calendar, Download, Printer, FileText, Filter, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { loadFonDataFromCSV, FonData } from './loadFonDataFromCSV'


interface FonTipi {
  id: string
  ad: string
  dosyaAdi: string
}

const fonTipleri: FonTipi[] = [
  { id: 'menkul', ad: 'Menkul Kıymet Yatırım Fonları', dosyaAdi: 'Menkul Kıymet Yatırım Fonları.csv' },
  { id: 'emeklilik', ad: 'Emeklilik Fonları', dosyaAdi: 'Emeklilik Fonları.csv' },
  { id: 'borsa', ad: 'Borsa Yatırım Fonları', dosyaAdi: 'Borsa Yatırım Fonları.csv' },
  { id: 'gayrimenkul', ad: 'Gayrimenkul Yatırım Fonları', dosyaAdi: 'Gayrimenkul Yatırım Fonları.csv' },
  { id: 'girisim', ad: 'Girişim Sermayesi Yatırım Fonları', dosyaAdi: 'Girişim Sermayesi Yatırım Fonları.csv' }
]

const portfoyYonetimSirketleri = [];

export default function YatirimFonlariPage() {
  const [selectedFonTipi, setSelectedFonTipi] = useState<string>('menkul')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('getiri')

  // Tab değişince fon tipini sıfırla (menkul)
  useEffect(() => {
    setSelectedFonTipi('menkul');
  }, [activeTab]);
  const [fonData, setFonData] = useState<FonData[]>([])
  const [sortField, setSortField] = useState<keyof FonData>('fonKodu')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [selectedSemsiyefon, setSelectedSemsiyefon] = useState<string>('')
  const [periodFilterPanelOpen, setPeriodFilterPanelOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<string>('')
  const filterPanelRef = useRef<HTMLDivElement>(null)
  const periodPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target as Node)) {
        setFilterPanelOpen(false)
      }
      if (periodPanelRef.current && !periodPanelRef.current.contains(event.target as Node)) {
        setPeriodFilterPanelOpen(false)
      }
    }
    if (filterPanelOpen || periodFilterPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [filterPanelOpen, periodFilterPanelOpen])

  const tabCsvFolders: Record<string, string> = {
    getiri: '/csv/01-getiri-bazli',
    yonetim: '/csv/02-yonetim-bazli',
    buyukluk: '/csv/03-buyukluk-bazli',
  }

  useEffect(() => {
    const csvFileName = fonTipleri.find(tip => tip.id === selectedFonTipi)?.dosyaAdi;
    if (!csvFileName) {
      setFonData([]);
      return;
    }
    const folder = tabCsvFolders[activeTab] || tabCsvFolders['getiri'];
    const csvPath = `${folder}/${csvFileName}`;
    loadFonDataFromCSV(csvPath)
      .then(setFonData)
      .catch(() => setFonData([]));
  }, [selectedFonTipi, activeTab]);

  const handleSort = (field: keyof FonData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredFonData = fonData.filter(fon => {
    const searchMatch = fon.fonKodu.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fon.fonAdi.toLowerCase().includes(searchTerm.toLowerCase());
    const semsiyeMatch = selectedSemsiyefon ? (fon.semsiyeFonTuru?.toLowerCase() === selectedSemsiyefon.toLowerCase()) : true;
    return searchMatch && semsiyeMatch;
  })

  // Dönem filtresi varsa tabloyu o sütuna göre azalan sırala
  const sortedFonData = selectedPeriod
    ? [...filteredFonData].sort((a, b) => {
        const aValue = a[selectedPeriod as keyof FonData];
        const bValue = b[selectedPeriod as keyof FonData];
        if (aValue == null) return 1;
        if (bValue == null) return -1;
        return (bValue as number) - (aValue as number);
      })
    : [...filteredFonData].sort((a, b) => {
        const aValue = a[sortField]
        const bValue = b[sortField]
        if (aValue == null) return 1 // Handles both null and undefined
        if (bValue == null) return -1 // Handles both null and undefined
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        return sortDirection === 'asc' ? comparison : -comparison
      });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Başlık ve üst alan */}
      <div className="flex flex-col items-start md:items-center md:flex-row md:justify-between gap-4 px-4 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-md tracking-tight">
            Yatırım Fonları
          </h1>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center px-4">
        <Select value={selectedFonTipi} onValueChange={setSelectedFonTipi}>

          <SelectTrigger className="w-full md:w-[300px] rounded-xl border-2 border-blue-100 shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all bg-white">
            <SelectValue placeholder="Fon tipi seçin" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {fonTipleri.map(tip => (
              <SelectItem key={tip.id} value={tip.id}>{tip.ad}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
          <Input
            placeholder="Fon kodu veya adı ile arayın..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-3 rounded-xl border-2 border-blue-100 shadow-sm focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition-all text-base"
          />
        </div>

        <div className="flex flex-col md:flex-row md:space-x-2 space-y-[5px] md:space-y-0 relative">
          <Button variant="outline" size="icon" onClick={() => setFilterPanelOpen(v => !v)} aria-label="Filtrele" className="rounded-xl border-2 border-pink-200 bg-white hover:bg-pink-50 shadow-sm focus:ring-2 focus:ring-pink-300">
            <Filter className="h-4 w-4 text-pink-400" />
          </Button>
          {filterPanelOpen && (
            <div ref={filterPanelRef} className="absolute z-30 right-0 mt-2 w-64 bg-white border-2 border-blue-100 rounded-2xl shadow-xl p-5 animate-fade-in">
              <div className="mb-3 font-semibold text-blue-700 text-base">Şemsiye Fon Türü</div>
              <select
                className="w-full border-2 border-blue-100 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                value={selectedSemsiyefon}
                onChange={e => setSelectedSemsiyefon(e.target.value)}
              >
                <option value="">Tümü</option>
                {Array.from(new Set(fonData.map(f => f.semsiyeFonTuru).filter(Boolean))).map(tur => (
                  <option key={tur} value={tur!}>{tur}</option>
                ))}
              </select>
              <button
                className="w-full bg-gradient-to-r from-blue-100 to-pink-100 hover:from-blue-200 hover:to-pink-200 rounded-lg p-2 text-sm font-semibold text-blue-700 transition-all"
                onClick={() => setSelectedSemsiyefon('')}
              >
                Temizle
              </button>
            </div>
          )}
          <Button variant="outline" size="icon" onClick={() => setPeriodFilterPanelOpen(v => !v)} aria-label="Dönem Filtrele" className="rounded-xl border-2 border-blue-200 bg-white hover:bg-blue-50 shadow-sm focus:ring-2 focus:ring-blue-300">
            <Calendar className="h-4 w-4 text-blue-400" />
          </Button>
          {periodFilterPanelOpen && (
            <div ref={periodPanelRef} className="absolute z-30 right-0 mt-2 w-72 bg-white border-2 border-pink-100 rounded-2xl shadow-xl p-5 animate-fade-in" style={{right: '3.5rem'}}>
              <div className="mb-3 font-semibold text-pink-700 text-base">Dönem Seç</div>
              <select
                className="w-full border-2 border-pink-100 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
                value={selectedPeriod}
                onChange={e => { setSelectedPeriod(e.target.value); setPeriodFilterPanelOpen(false); }}
              >
                <option value="">Tümü</option>
                <option value="birAyGetiri">1 Aylık</option>
                <option value="ucAyGetiri">3 Aylık</option>
                <option value="altiAyGetiri">6 Aylık</option>
                <option value="yilbasiGetiri">YBB</option>
                <option value="birYilGetiri">1 Yıllık</option>
                <option value="ucYilGetiri">3 Yıllık</option>
                <option value="besYilGetiri">5 Yıllık</option>
              </select>
              <button
                className="w-full bg-gradient-to-r from-pink-100 to-blue-100 hover:from-pink-200 hover:to-blue-200 rounded-lg p-2 text-sm font-semibold text-pink-700 transition-all"
                onClick={() => setSelectedPeriod('')}
              >
                Temizle
              </button>
            </div>
          )}
           <Button variant="outline" size="icon" onClick={() => {
             // CSV export fonksiyonu
             const headers = [
               'Fon Kodu',
               'Fon Adı',
               'Şemsiye Fon Türü',
               '1 Aylık',
               '3 Aylık',
               '6 Aylık',
               'YBB',
               '1 Yıllık',
               '3 Yıllık',
               '5 Yıllık',
             ];
             const rows = sortedFonData.map(fon => [
               fon.fonKodu,
               fon.fonAdi,
               fon.semsiyeFonTuru || '-',
               fon.birAyGetiri?.toFixed(2) ?? '-',
               fon.ucAyGetiri?.toFixed(2) ?? '-',
               fon.altiAyGetiri?.toFixed(2) ?? '-',
               fon.yilbasiGetiri?.toFixed(2) ?? '-',
               fon.birYilGetiri?.toFixed(2) ?? '-',
               fon.ucYilGetiri !== null && fon.ucYilGetiri !== undefined ? fon.ucYilGetiri.toFixed(2) : '-',
               fon.besYilGetiri !== null && fon.besYilGetiri !== undefined ? fon.besYilGetiri.toFixed(2) : '-',
             ]);
             const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
             const blob = new Blob([csv], { type: 'text/csv' });
             const url = URL.createObjectURL(blob);
             const a = document.createElement('a');
             a.href = url;
             // Dosya adını aktif klasör ve seçili csv dosya adına göre ayarla
             const folderMap: Record<string, string> = { getiri: '01-getiri-bazli', yonetim: '02-yonetim-bazli', buyukluk: '03-buyukluk-bazli' };
             const folderName = Object.prototype.hasOwnProperty.call(folderMap, activeTab) ? folderMap[activeTab] : activeTab;
             const fonTipi = fonTipleri.find(tip => tip.id === selectedFonTipi);
             const fileName = `${folderName}-${fonTipi?.dosyaAdi || 'yatirim-fonlari'}`;
             a.download = fileName.endsWith('.csv') ? fileName : fileName + '.csv';
             document.body.appendChild(a);
             a.click();
             document.body.removeChild(a);
             URL.revokeObjectURL(url);
           }}>
             <Download className="h-4 w-4" />
           </Button>
          <Button variant="outline" size="icon" onClick={() => {
             // Yazdırma fonksiyonu
             const headers = [
               'Fon Kodu',
               'Fon Adı',
               'Şemsiye Fon Türü',
               '1 Aylık',
               '3 Aylık',
               '6 Aylık',
               'YBB',
               '1 Yıllık',
               '3 Yıllık',
               '5 Yıllık',
             ];
             const rows = sortedFonData.map(fon => [
               fon.fonKodu,
               fon.fonAdi,
               fon.semsiyeFonTuru || '-',
               fon.birAyGetiri?.toFixed(2) ?? '-',
               fon.ucAyGetiri?.toFixed(2) ?? '-',
               fon.altiAyGetiri?.toFixed(2) ?? '-',
               fon.yilbasiGetiri?.toFixed(2) ?? '-',
               fon.birYilGetiri?.toFixed(2) ?? '-',
               fon.ucYilGetiri !== null && fon.ucYilGetiri !== undefined ? fon.ucYilGetiri.toFixed(2) : '-',
               fon.besYilGetiri !== null && fon.besYilGetiri !== undefined ? fon.besYilGetiri.toFixed(2) : '-',
             ]);
             const tableHtml = `
               <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:13px;">
                 <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                 <tbody>
                   ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
                 </tbody>
               </table>
             `;
             const printWindow = window.open('', '', 'width=1200,height=800');
             if (printWindow) {
               printWindow.document.write(`
                 <html><head><title>Yatırım Fonları Tablosu</title>
                 <style>
                   body { font-family: Arial, sans-serif; padding: 24px; }
                   table { width: 100%; margin-top: 12px; }
                   th, td { padding: 6px 8px; }
                   th { background: #f3f3f3; }
                 </style>
                 </head><body>
                 <h2>Yatırım Fonları Tablosu</h2>
                 ${tableHtml}
                 <script>window.onload = function() { window.print(); }</script>
                 </body></html>
               `);
               printWindow.document.close();
             }
           }}>
             <Printer className="h-4 w-4" />
           </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-10 items-center justify-center text-muted-foreground w-full flex overflow-x-auto rounded-xl shadow-sm bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 p-1 sticky top-0 z-10 mt-[5px]">
          <TabsTrigger value="getiri" className="px-6 py-2 rounded-lg text-base font-semibold transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-pink-400 data-[state=active]:text-white data-[state=active]:shadow-lg">
            Getiri Bazlı
          </TabsTrigger>
          <TabsTrigger value="yonetim" className="px-6 py-2 rounded-lg text-base font-semibold transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-400 data-[state=active]:text-white data-[state=active]:shadow-lg">
            Yönetim Bazlı
          </TabsTrigger>
          <TabsTrigger value="buyukluk" className="px-6 py-2 rounded-lg text-base font-semibold transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
            Büyüklük Bazlı
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <Card className="rounded-2xl shadow-xl border-2 border-blue-100 overflow-x-auto">
            <CardContent className="p-0">
              <div className="w-full overflow-x-auto">
                <Table className="min-w-[900px]">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-pink-50">
                      {fonData.length > 0 && Object.keys(fonData[0]).map((col, i) => {
                        const columnHeaderMap: Record<string, string> = {
                          fonKodu: 'Fon Kodu',
                          fonAdi: 'Fon Adı',
                          semsiyeFonTuru: 'Şemsiye Fon Türü',
                          birAyGetiri: '1 Aylık',
                          ucAyGetiri: '3 Aylık',
                          altiAyGetiri: '6 Aylık',
                          yilbasiGetiri: 'YBB',
                          birYilGetiri: '1 Yıllık',
                          ucYilGetiri: '3 Yıllık',
                          besYilGetiri: '5 Yıllık',
                        };
                        return (
                          <TableHead key={col} className="text-sm font-bold text-blue-700 px-2 py-2 sticky top-0 bg-gradient-to-r from-blue-50 to-pink-50 z-10 whitespace-nowrap">
                            {columnHeaderMap[col] || col}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedFonData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={fonData.length > 0 ? Object.keys(fonData[0]).length : 1} className="text-center text-gray-400 py-8">
                          Veri bulunamadı
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedFonData.map((fon, idx) => (
                        <TableRow key={fon.fonKodu || idx} className={`transition-all ${idx % 2 === 0 ? 'bg-white' : 'bg-gradient-to-r from-blue-50 to-pink-50'} hover:bg-pink-100/60 hover:scale-[1.01]`}>
                          {Object.keys(fon).map((col, j) => (
                            <TableCell key={col} className="px-4 py-3 whitespace-nowrap text-blue-900">
                              {(fon as Record<string, any>)[col] !== undefined && (fon as Record<string, any>)[col] !== null ? (fon as Record<string, any>)[col] : '-'}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
