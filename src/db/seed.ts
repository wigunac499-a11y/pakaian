import { getDb } from './index';
import { admins, templates, blogPosts } from './schema';
import { hashPassword } from '../lib/auth';
import 'dotenv/config';

async function seed() {
  const db = await getDb();

  console.log('Seeding database...');

  const existingAdmin = await db.select().from(admins);
  if (existingAdmin.length === 0) {
    await db.insert(admins).values({
      username: 'admin',
      email: 'admin@webpakai.com',
      password: hashPassword('admin123'),
      createdAt: new Date(),
    });
    console.log('Admin created: admin / admin123');
  }

  const existingTemplates = await db.select().from(templates);
  if (existingTemplates.length === 0) {
    await db.insert(templates).values([
      {
        title: 'Toko Online Modern',
        slug: 'toko-online-modern',
        category: 'E-Commerce',
        description: 'Template toko online modern dengan fitur katalog produk, keranjang belanja, dan checkout yang responsif. Cocok untuk UMKM yang ingin jualan online.',
        features: 'Katalog produk dengan filter\nKeranjang belanja\nHalaman checkout\nIntegrasi pembayaran\nDashboard penjualan\nResponsif mobile',
        demoUrl: 'https://demo.webpakai.com/toko-online',
        price: 'Mulai Rp 750.000',
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Company Profile Profesional',
        slug: 'company-profile-profesional',
        category: 'Company Profile',
        description: 'Template company profile profesional untuk memperkenalkan perusahaan Anda secara modern dan meyakinkan.',
        features: 'Halaman beranda hero\nTentang perusahaan\nTim & portofolio\nLayanan\nKontak & Google Maps\nBlog terintegrasi',
        demoUrl: 'https://demo.webpakai.com/company-profile',
        price: 'Mulai Rp 500.000',
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Portofolio Kreatif',
        slug: 'portofolio-kreatif',
        category: 'Portofolio',
        description: 'Template portofolio interaktif untuk kreator, desainer, fotografer, dan seniman.',
        features: 'Galeri grid & masonry\nLightbox preview\nHalaman tentang\nTestimoni klien\nForm kontak\nAnimasi scroll',
        demoUrl: 'https://demo.webpakai.com/portofolio',
        price: 'Mulai Rp 400.000',
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log('Templates seeded');
  }

  const existingPosts = await db.select().from(blogPosts);
  if (existingPosts.length === 0) {
    await db.insert(blogPosts).values([
      {
        title: 'Tips Memilih Template Website untuk UMKM',
        slug: 'tips-memilih-template-website-umkm',
        excerpt: 'Panduan memilih template website yang tepat untuk usaha kecil dan menengah agar efektif dan hemat biaya.',
        content: 'Memilih template website yang tepat adalah langkah krusial bagi UMKM yang ingin go digital. Berikut beberapa tips yang perlu diperhatikan:\n\n1. Sesuaikan dengan Kebutuhan Bisnis\nPilih template yang memiliki fitur sesuai dengan jenis usaha Anda. Toko online butuh katalog produk, jasa butuh portofolio.\n\n2. Prioritaskan Kecepatan Loading\nWebsite yang lambat akan membuat pengunjung pergi. Pilih template yang dioptimalkan untuk kecepatan.\n\n3. Pastikan Responsif\nTemplate harus tampil sempurna di semua perangkat, dari HP hingga desktop.\n\n4. Optimasi SEO\nPilih template dengan struktur kode yang SEO-friendly untuk memudahkan pencarian di Google.\n\n5. Kemudahan Kustomisasi\nPastikan template mudah diubah sesuai branding bisnis Anda tanpa perlu coding.',
        coverImage: null,
        metaTitle: 'Tips Memilih Template Website untuk UMKM',
        metaDescription: 'Panduan lengkap memilih template website untuk UMKM. Tips memilih template yang cepat, responsif, dan SEO-friendly.',
        author: 'Admin',
        isPublished: true,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pentingnya SEO untuk Website Bisnis Anda',
        slug: 'pentingnya-seo-untuk-website-bisnis',
        excerpt: 'Mengapa SEO adalah investasi jangka panjang yang wajib dilakukan untuk setiap website bisnis.',
        content: 'SEO (Search Engine Optimization) adalah proses mengoptimalkan website agar muncul di peringkat atas hasil pencarian Google. Berikut alasannya penting:\n\n1. Meningkatkan Visibilitas\nWebsite yang muncul di halaman pertama Google mendapatkan 95% traffic. Halaman kedua dan seterusnya jarang diklik.\n\n2. Mendapatkan Traffic Organik Gratis\nTidak perlu membayar iklan setiap kali ada yang mengunjungi website Anda.\n\n3. Membangun Kredibilitas\nWebsite yang muncul di peringkat atas dianggap lebih terpercaya oleh pengguna.\n\n4. Targeting Audiens Tepat\nSEO membantu Anda menjangkau orang yang sedang mencari produk atau jasa yang Anda tawarkan.\n\n5. Hasil Jangka Panjang\nEfek SEO bersifat kumulatif dan bertahan lama, berbeda dengan iklan berbayar yang berhenti saat budget habis.',
        coverImage: null,
        metaTitle: 'Pentingnya SEO untuk Website Bisnis',
        metaDescription: 'Pelajari mengapa SEO penting untuk website bisnis Anda. Tingkatkan visibilitas, traffic organik, dan kredibilitas online.',
        author: 'Admin',
        isPublished: true,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log('Blog posts seeded');
  }

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
