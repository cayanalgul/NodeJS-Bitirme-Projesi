# Yazılım Hata ve Geliştirme Yönetim Sistemi

## Projenin Amacı

Bu projenin amacı, bir yazılım şirketinde farklı projelerde ortaya çıkan **yazılım hatalarının (bug)** ve **yeni geliştirme taleplerinin (feature)** düzenli ve merkezi bir şekilde takip edilmesini sağlayan REST API geliştirmektir.

Sistem sayesinde hata ve geliştirme talepleri oluşturulabilir, çalışanlara atanabilir, önceliklendirilebilir ve geliştirme sürecindeki durumları takip edilebilir.

Proje, **Node.js ve Express.js** kullanılarak REST API mimarisine uygun şekilde geliştirilmiştir. Veriler JSON formatında saklanmaktadır. **Nodemon** ile daha kolay geliştirme sağladım fakat bu modul projede herhangi bir eksiklik oluşturmayacaktır kurulmaması halinde.

## Proje Senaryosu

Bir yazılım şirketi, geliştirdiği farklı projelerde ortaya çıkan hataları ve müşterilerden veya ekip üyelerinden gelen yeni geliştirme taleplerini takip etmek istemektedir.

Bir hata tespit edildiğinde veya yeni bir özellik geliştirilmesi gerektiğinde sistemde yeni bir kayıt oluşturulur. Oluşturulan kayıt ilgili projeye bağlanır ve sorumlu çalışana atanır.

Her kayıt için bir öncelik seviyesi ve mevcut durum bilgisi tutulur. Böylece ekip üyeleri hangi taleplerin beklediğini, hangilerinin geliştirme veya test aşamasında olduğunu ve hangilerinin tamamlandığını takip edebilir.

Sistemde iki temel kayıt türü bulunmaktadır:

- **Bug:** Yazılım içerisinde tespit edilen hata ve problemlerdir.
- **Feature:** Yazılıma eklenmesi planlanan yeni özellik ve geliştirme talepleridir.

## Temel Sistem Özellikleri

Sistem hata ve geliştirme talepleri üzerinde temel CRUD operasyonlarını desteklemektedir.

- Yeni hata veya geliştirme talebi oluşturma
- Sistemdeki tüm kayıtları listeleme
- ID bilgisine göre kayıt detayını görüntüleme
- Mevcut kayıtları güncelleme
- Kayıtları sistemden silme
- Kayıtları tür, öncelik, durum, proje ve sorumlu çalışana göre filtreleme
- Başlık ve açıklama alanlarında arama yapma
- Sayfalama ile kayıtları belirli sayıda listeleme
- Gelen verileri Validation Middleware ile kontrol etme
- API isteklerini Logger Middleware ile takip etme
- Temel raporlama işlemleri gerçekleştirme

## Veri Yapısı

Her hata veya geliştirme talebi aşağıdaki temel bilgileri içermektedir:

`id` — Kaydın benzersiz kimliği  
`title` — Talebin başlığı  
`description` — Talebin açıklaması  
`type` — Bug veya feature bilgisi  
`project` — İlgili yazılım projesi  
`assignee` — Talebin atandığı çalışan  
`priority` — Öncelik seviyesi  
`status` — Talebin mevcut durumu  
`createdAt` — Oluşturulma tarihi

## Kullanılan Teknolojiler

- Node.js
- Express.js
- REST API
- JSON
- Node.js File System (`fs`)
- Express Routing
- Middleware
- Postman
- Nodemon(İsteğe Bağlı)

## Sonuç

Geliştirilen sistem ile bir yazılım şirketindeki hata ve geliştirme taleplerinin oluşturulması, çalışanlara atanması, güncellenmesi ve takip edilmesi sağlanmaktadır.

REST API yapısı sayesinde sistemdeki kayıtlar merkezi olarak yönetilebilmekte; filtreleme, arama, sayfalama ve raporlama özellikleri sayesinde geliştirme sürecinin daha düzenli ve takip edilebilir hale getirilmesi amaçlanmaktadır.