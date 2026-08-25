# Kurulum ve Çalıştırma Notu

## 1. Projenin İndirilmesi

Proje GitHub üzerinden indirilecekse terminalde aşağıdaki komut kullanılabilir:

```bash
git clone [PROJE_REPO_ADRESI](https://github.com/cayanalgul/NodeJS-Bitirme-Projesi.git)
```

Daha sonra proje klasörüne girilir:

```bash
cd proje-klasoru
```

Proje ZIP dosyası olarak indirildiyse dosya çıkartılır ve terminal üzerinden proje klasörüne geçilir.

## 2. Bağımlılıkların Kurulması

Projede gerekli paketlerin kurulabilmesi için bilgisayarda **Node.js** yüklü olmalıdır.

Node.js kurulduktan sonra proje klasöründe terminal açılır ve aşağıdaki komut çalıştırılır:

```bash
npm install
```

Bu komut `package.json` dosyasında bulunan bağımlılıkları otomatik olarak yükler.

Projede temel olarak kullanılan harici paket:

```text
express
```

`fs` ve `path` modülleri Node.js ile birlikte geldiği için ayrıca kurulmalarına gerek yoktur.

## 3. Sunucunun Çalıştırılması

Bağımlılıklar kurulduktan sonra sunucuyu başlatmak için:

```bash
node app.js
```

komutu çalıştırılır.

Sunucu başarılı şekilde başlatıldığında terminalde buna benzer bir mesaj görüntülenir:

```text
PORT: 3000 Adresinde Çalışıyor.
Tam Bağlantı: http://localhost:3000
```

## 4. API'nin Test Edilmesi

Sunucu çalıştıktan sonra API istekleri Postman veya benzeri bir API test aracı üzerinden gönderilebilir.

Temel adres:

```text
http://localhost:3000
```

Örneğin tüm kayıtları listelemek için:

```http
GET http://localhost:3000/reports
```

Tek bir kaydı görüntülemek için:

```http
GET http://localhost:3000/reports/:id
```

Yeni kayıt oluşturmak için:

```http
POST http://localhost:3000/reports
```

Kayıt güncellemek için:

```http
PUT http://localhost:3000/reports/:id
```

Kayıt silmek için:

```http
DELETE http://localhost:3000/reports/:id
```

## 5. Sunucunun Durdurulması

Sunucuyu durdurmak için terminalde:

```text
Ctrl + C
```

tuş kombinasyonu kullanılabilir veya terminali direkt kapatabilirsiniz.

## Özet

Projeyi çalıştırmak için temel olarak aşağıdaki adımlar yeterlidir:

```bash
git clone PROJE_REPO_ADRESI
cd proje-klasoru
npm install
node app.js
```

Bu işlemler tamamlandıktan sonra REST API `http://localhost:3000` adresi üzerinden kullanılabilir.
