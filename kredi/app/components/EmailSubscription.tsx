'use client';

import { useState, useRef } from 'react';

export default function EmailSubscription() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [dataProcessingConsent, setDataProcessingConsent] = useState(false);
  const [showRizaPopup, setShowRizaPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Lütfen e-posta adresinizi girin.');
      setIsSuccess(false);
      return;
    }

    if (!marketingConsent || !dataProcessingConsent) {
      setMessage('Lütfen gerekli izinleri onaylayın.');
      setIsSuccess(false);
      return;
    }

    // E-posta formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          marketingConsent,
          dataProcessingConsent,
          subscriptionDate: new Date()
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage('Teşekkürler! E-posta adresiniz kaydedildi.');
        setEmail('');
        setMarketingConsent(false);
        setDataProcessingConsent(false);
      } else {
        const data = await response.json();
        setMessage(data.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Popup dışına tıklandığında kapatma işlevi
  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowRizaPopup(false);
    }
  };

  // Popup gösterildiğinde event listener ekle
  useState(() => {
    if (showRizaPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className="w-full py-4 px-4 relative">
      <div className="container mx-auto">
        <div className="max-w-full mx-auto bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {/* Başlık */}
          <div className="border-b border-gray-200 p-4">
            <h3 className="text-xl font-bold text-gray-800 text-center">Sana Özel Teklif Al</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start p-4">
            {/* Sol taraf - E-posta formu */}
            <div className="w-full sm:w-1/2 flex flex-col sm:flex-row items-center gap-2 pr-4 sm:pr-8">
              <div className="flex-shrink-0 mr-2 hidden sm:block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="E-posta adresini yaz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-gray-800"
                  aria-label="E-posta Adresi"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                </button>
              </form>
            </div>
            
            {/* Sağ taraf - Onay kutuları */}
            <div className="w-full sm:w-1/2 mt-4 sm:mt-0 border-t sm:border-t-0 sm:border-l border-gray-200 pl-0 sm:pl-8 pt-4 sm:pt-0">
              <div className="space-y-2">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="marketingConsent"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-1 mr-2 h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="marketingConsent" className="text-xs text-gray-700">
                    <span className="font-medium">KrediKulis</span>'e özel indirim ve fırsatlardan 
                    <button 
                      type="button"
                      className="text-green-600 font-bold underline focus:outline-none"
                      onClick={() => setShowRizaPopup(true)}
                    >
                      Açık Rıza Metni
                    </button> kapsamında bilgi almak istiyorum.
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="dataProcessingConsent"
                    checked={dataProcessingConsent}
                    onChange={(e) => setDataProcessingConsent(e.target.checked)}
                    className="mt-1 mr-2 h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="dataProcessingConsent" className="text-xs text-gray-700">
                    Kişisel verilerimin <strong className="text-green-600">Aydınlatma Metni</strong> kapsamında işlenmesine izin veriyorum.
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {message && (
            <div className={`text-sm p-3 border-t ${isSuccess ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
              <div className="flex items-center">
                {isSuccess ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Açık Rıza Metni Popup */}
      {showRizaPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div ref={popupRef} className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Açık Rıza Metni</h3>
                <button 
                  onClick={() => setShowRizaPopup(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-700 mb-4">İletişim bilgilerimin ticari ileti gönderilmesi, reklam/kampanya promosyon süreçlerinin ve iletişim faaliyetlerinin yürütülmesi amacıyla işlenmesine KVKK Md.5/1 kapsamında rıza veriyorum.</p>
              <p className="text-gray-700 mb-4">Bu izin ile KrediKulis tarafından;</p>
              <ul className="list-disc pl-5 mb-4 text-gray-700">
                <li>Ürünler ve hizmetler hakkında bilgi verilmesi,</li>
                <li>Öneri ve kampanyaların sunulması,</li>
                <li>Tanıtım ve duyuruların yapılması,</li>
                <li>Müşteri memnuniyeti çalışmalarının gerçekleştirilmesi,</li>
                <li>İstatistiksel değerlendirmelerin yapılması</li>
              </ul>
              <p className="text-gray-700">amaçlarıyla tarafıma elektronik iletişim araçları ile ticari elektronik ileti gönderilmesine onay veriyorum.</p>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button 
                onClick={() => setShowRizaPopup(false)}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
