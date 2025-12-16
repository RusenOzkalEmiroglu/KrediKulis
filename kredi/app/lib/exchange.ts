// TC Merkez Bankası döviz ve altın kurlarını çeken fonksiyon
export interface ExchangeRates {
  USD: { rate: number; change: number };
  EUR: { rate: number; change: number };
  GBP: { rate: number; change: number };
  XAU: { rate: number; change: number }; // Gram Altın
  QXAU: { rate: number; change: number }; // Çeyrek Altın
}

export async function getExchangeRates(): Promise<ExchangeRates> {
  try {
    // Gerçek bir API çağrısı yapılabilir, şu anda örnek veriler kullanıyoruz
    // NOT: Gerçek bir uygulamada TCMB API'sı kullanılabilir
    
    // Örnek veriler (görseldekine benzer)
    return {
      USD: { rate: 36.612, change: 0.07 },
      EUR: { rate: 39.92, change: -0.13 },
      GBP: { rate: 47.334, change: -0.1 },
      XAU: { rate: 3480.674, change: 0.59 },
      QXAU: { rate: 5690.9, change: 0.59 }
    };
  } catch (error) {
    console.error('Exchange rate API error:', error);
    throw error;
  }
} 