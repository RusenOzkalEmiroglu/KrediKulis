
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uxtlcbcnwmxeyszhlewf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4dGxjYmNud214ZXlzemhsZXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NzA3NDgsImV4cCI6MjA1OTI0Njc0OH0._EkYRxwdfj-pTwFHj_Nk7e6nifsM75IgEbNLfllZNsQ';

const supabase = createClient(supabaseUrl, supabaseKey);

const banks = [
  { id: 6, name: 'İş Bankası' },
  { id: 2, name: 'Garanti BBVA' },
  { id: 7, name: 'Yapı Kredi' },
  { id: 4, name: 'ZİRAAT BANKASI' },
  { id: 5, name: 'Kuveyt Türk' },
  { id: 8, name: 'AKBANK' },
  { id: 9, name: 'DENİZBANK' },
  { id: 10, name: 'ING BANK' },
  { id: 11, name: 'QNB' },
  { id: 12, name: 'ENPARA' }
];

const seedVehicleLoans = async () => {
  try {
    const loansToInsert = [];

    for (const bank of banks) {
      // Sıfır araç kredisi
      loansToInsert.push({
        bank_id: bank.id,
        loan_type: '0',
        amount: Math.floor(Math.random() * 500000) + 100000,
        term: [48],
        interest_rate: (Math.random() * (3.5 - 1.5) + 1.5).toFixed(2),
        allocation_fee: 0,
        kkdf: 15,
        bsmv: 5,
        real_interest_rate: (Math.random() * (4 - 2) + 2).toFixed(2),
        annual_cost_rate: (Math.random() * (50 - 30) + 30).toFixed(2),
        description: `${bank.name} için örnek sıfır taşıt kredisi.`
      });

      // İkinci el araç kredisi
      loansToInsert.push({
        bank_id: bank.id,
        loan_type: '2. el',
        amount: Math.floor(Math.random() * 300000) + 50000,
        term: [36],
        interest_rate: (Math.random() * (4 - 2) + 2).toFixed(2),
        allocation_fee: 0,
        kkdf: 15,
        bsmv: 5,
        real_interest_rate: (Math.random() * (4.5 - 2.5) + 2.5).toFixed(2),
        annual_cost_rate: (Math.random() * (60 - 40) + 40).toFixed(2),
        description: `${bank.name} için örnek ikinci el taşıt kredisi.`
      });
    }

    const { data, error } = await supabase.from('vehicle_loans').insert(loansToInsert);

    if (error) {
      throw error;
    }

    console.log('Successfully seeded vehicle loans:', data);
  } catch (error) {
    console.error('Error seeding vehicle loans:', error);
  }
};

seedVehicleLoans();
