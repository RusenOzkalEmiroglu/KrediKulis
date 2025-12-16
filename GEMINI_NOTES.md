# Supabase Projesine Yeniden Bağlanma Talimatları

Bu not, Gemini CLI ile bu projede çalışırken Supabase CLI aracılığıyla uzak veritabanına yeniden nasıl bağlanılacağını açıklar.

**Önemli:** Komutları, projenin kök dizininde (`kredi` klasörü içinde) çalıştırın.

---

### Adım 1: Supabase CLI Kurulumunu Doğrulama

Supabase CLI'ın sisteminizde kurulu ve çalışır durumda olduğundan emin olun. Eğer `supabase` komutu tanınmıyorsa, daha önceki oturumda `scoop` kullanılarak yapılan kurulum adımlarını tekrarlamanız gerekebilir. Windows için önerilen adımlar:

1.  **Scoop Kurulumu (Eğer sistemde yoksa):**
    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
    ```

2.  **Supabase CLI Kurulumu:**
    ```powershell
    scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
    scoop install supabase
    ```

### Adım 2: Supabase CLI'a Giriş Yapma

Bu komut, kimlik doğrulama için tarayıcınızda bir sayfa açacaktır.

```powershell
# Not: $env:PATH... kısmı, komutun bulunamaması durumunda geçici bir çözümdür.
# Yeni bir terminal açtıysanız sadece 'supabase login' yazmanız yeterli olabilir.
$env:PATH = "$HOME\scoop\shims;" + $env:PATH; supabase login
```

### Adım 3: Projeyi Uzak Supabase Ortamına Bağlama

Giriş yaptıktan sonra, yerel projenizi uzak projenize bağlayın.

1.  **Proje Referansını Bulun:**
    Proje referansınız (`project-ref`), `kredi/.env.local` dosyasındaki `NEXT_PUBLIC_SUPABASE_URL` içinde bulunur.
    Örnek: `https://**uxtlcbcnwmxeyszhlewf**.supabase.co` adresindeki kalın yazılı kısım.

2.  **Bağlantı Komutunu Çalıştırın:**
    Aşağıdaki komutta `<PROJE_REFERANSINIZ>` yazan yeri kendi referansınızla değiştirin.
    ```powershell
    # Not: $env:PATH... kısmı, komutun bulunamaması durumunda geçici bir çözümdür.
    $env:PATH = "$HOME\scoop\shims;" + $env:PATH; supabase link --project-ref <PROJE_REFERANSINIZ>
    ```
    Bu komut sizden veritabanı şifrenizi isteyebilir.

---
Bu adımlar tamamlandığında, projeniz yeniden uzak Supabase veritabanına bağlanmış olacaktır.
