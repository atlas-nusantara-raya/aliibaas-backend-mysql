import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // --- 1. SEED ROLES ---
  console.log('- Seeding MtRole...');
  const roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
  ];
  for (const role of roles) {
    await prisma.mtRole.upsert({
      where: { id: role.id },
      update: { name: role.name },
      create: { id: role.id, name: role.name },
    });
  }

  // --- 2. SEED GENDERS ---
  console.log('- Seeding MtGender...');
  const genders = [
    { id: 1, code: 'M', name: 'Male' },
    { id: 2, code: 'F', name: 'Female' },
    { id: 3, code: 'U', name: 'Unisex' },
  ];
  for (const g of genders) {
    await prisma.mtGender.upsert({
      where: { id: g.id },
      update: { code: g.code, name: g.name },
      create: { id: g.id, code: g.code, name: g.name },
    });
  }

  // --- 3. SEED SIZES ---
  console.log('- Seeding MtSize...');
  const sizes = [
    { name: 'S', description: 'Small' },
    { name: 'M', description: 'Medium' },
    { name: 'L', description: 'Large' },
    { name: 'XL', description: 'Extra Large' },
    { name: 'XXL', description: 'Double Extra Large' },
  ];
  for (const s of sizes) {
    await prisma.mtSize.upsert({
      where: { id: sizes.indexOf(s) + 1 },
      update: { name: s.name, description: s.description },
      create: { name: s.name, description: s.description },
    });
  }

  // --- 4. SEED COLORS ---
  console.log('- Seeding MtColor...');
  const colors = ['Hitam', 'Putih', 'Navy', 'Abu-abu', 'Cokelat', 'Maroon'];
  for (const c of colors) {
    await prisma.mtColor.upsert({
      where: { id: colors.indexOf(c) + 1 },
      update: { name: c },
      create: { name: c },
    });
  }

  // --- 5. SEED STATUSES ---
  console.log('- Seeding MtStatus...');
  const statuses = [
    // type: order
    { id: 1, type_status: 'order', code: 'pending', name: 'Menunggu Order' },
    { id: 2, type_status: 'order', code: 'confirmed', name: 'Order Dikonfirmasi' },
    { id: 3, type_status: 'order', code: 'processed', name: 'Diproses' },
    { id: 4, type_status: 'order', code: 'packed', name: 'Dikemas' },
    { id: 5, type_status: 'order', code: 'shipped', name: 'Dikirim' },
    { id: 6, type_status: 'order', code: 'completed', name: 'Selesai' },
    { id: 7, type_status: 'order', code: 'cancelled', name: 'Dibatalkan' },
    // type: payment
    { id: 8, type_status: 'payment', code: 'pending', name: 'Menunggu Pembayaran' },
    { id: 9, type_status: 'payment', code: 'paid', name: 'Sudah Dibayar' },
    { id: 10, type_status: 'payment', code: 'failed', name: 'Gagal' },
    { id: 11, type_status: 'payment', code: 'expired', name: 'Expired' },
    { id: 12, type_status: 'payment', code: 'refunded', name: 'Dikembalikan' },
    // type: shipment
    { id: 13, type_status: 'shipment', code: 'pending', name: 'Belum Dikirim' },
    { id: 14, type_status: 'shipment', code: 'shipped', name: 'Dalam Pengiriman' },
    { id: 15, type_status: 'shipment', code: 'delivered', name: 'Sampai Tujuan' },
    { id: 16, type_status: 'shipment', code: 'returned', name: 'Dikembalikan' },
    // type: payment_method
    { id: 17, type_status: 'payment_method', code: 'qris', name: 'QRIS' },
    { id: 18, type_status: 'payment_method', code: 'bank_transfer', name: 'Transfer Bank' },
    { id: 19, type_status: 'payment_method', code: 'ewallet_gopay', name: 'GoPay' },
    { id: 20, type_status: 'payment_method', code: 'ewallet_ovo', name: 'OVO' },
    { id: 21, type_status: 'payment_method', code: 'ewallet_dana', name: 'DANA' },
    { id: 22, type_status: 'payment_method', code: 'credit_card', name: 'Kartu Kredit' },
    { id: 23, type_status: 'payment_method', code: 'debit_card', name: 'Kartu Debit' },
  ];
  for (const st of statuses) {
    await prisma.mtStatus.upsert({
      where: { id: st.id },
      update: { type_status: st.type_status, code: st.code, name: st.name, is_active: 1 },
      create: { id: st.id, type_status: st.type_status, code: st.code, name: st.name, is_active: 1 },
    });
  }

  // --- 6. SEED BRANDS ---
  console.log('- Seeding MtBrand...');
  const brands = [
    { name: 'Al-Fatih Exclusive', description: 'Premium Islamic Fashion' },
    { name: 'Allibaas Premium', description: 'Elegant and Modest Wear' },
    { name: 'Ittaqullah', description: 'Daily Sunnah Wear' },
  ];
  for (const b of brands) {
    await prisma.mtBrand.upsert({
      where: { id: brands.indexOf(b) + 1 },
      update: { name: b.name, description: b.description },
      create: { name: b.name, description: b.description },
    });
  }

  // --- 7. SEED CATEGORIES ---
  console.log('- Seeding MtCategory...');
  const categories = [
    { name: 'Gamis Pria', display_order: 1 },
    { name: 'Koko Kurta', display_order: 2 },
    { name: 'Sirwal', display_order: 3 },
    { name: 'Jubba', display_order: 4 },
    { name: 'Aksesoris', display_order: 5 },
  ];
  for (const cat of categories) {
    await prisma.mtCategory.upsert({
      where: { id: categories.indexOf(cat) + 1 },
      update: { name: cat.name, display_order: cat.display_order },
      create: { name: cat.name, display_order: cat.display_order },
    });
  }

  // --- 8. SEED USERS ---
  console.log('- Seeding Users...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { id: 'ADMN-01' },
    update: { password: hashedPassword },
    create: {
      id: 'ADMN-01',
      name: 'Super Admin Allibaas',
      email: 'admin@allibaas.id',
      password: hashedPassword,
      phone: '081234567890',
      roles: {
        create: { role_id: 1 },
      },
      addresses: {
        create: {
          label: 'Kantor Pusat',
          recipient_name: 'Admin Allibaas',
          phone: '081234567890',
          address: 'Jl. Ahmad Yani No. 123',
          province_id: '11',
          province_name: 'Jawa Timur',
          city_id: '444',
          city_name: 'Surabaya',
          district_id: '6145',
          district_name: 'Wonokromo',
          postal_code: '60243',
          is_default: 1,
        }
      }
    },
  });

  const normalUser = await prisma.user.upsert({
    where: { id: 'USR-TEST-01' },
    update: { password: userPassword },
    create: {
      id: 'USR-TEST-01',
      name: 'John Doe',
      email: 'user@allibaas.id',
      password: userPassword,
      phone: '08987654321',
      roles: {
        create: { role_id: 2 },
      },
      addresses: {
        create: {
          label: 'Rumah',
          recipient_name: 'John Doe',
          phone: '08987654321',
          address: 'Griya Asri Permata Blok C1',
          province_id: '9',
          province_name: 'Jawa Barat',
          city_id: '115',
          city_name: 'Depok',
          district_id: '1585',
          district_name: 'Beji',
          postal_code: '16421',
          is_default: 1,
        }
      }
    },
  });

  // --- 9. SEED PRODUCTS ---
  console.log('- Seeding Products...');
  const productSamples = [
    {
      name: 'Gamis Al-Haramain Exclusive',
      description: 'Gamis impor premium dengan bahan yang dingin dan jatuh.',
      category_id: 1, // Gamis Pria
      brand_id: 1,    // Al-Fatih
      base_price: 350000,
      gender_id: 1    // Male
    },
    {
      name: 'Koko Kurta Modern Fit',
      description: 'Kurta lengan 3/4 dengan gaya minimalis kontemporer.',
      category_id: 2, // Koko Kurta
      brand_id: 2,    // Allibaas
      base_price: 185000,
      gender_id: 1
    },
    {
      name: 'Sirwal Tactical Army',
      description: 'Sirwal multifungsi dengan banyak saku untuk aktivitas outdoor.',
      category_id: 3, // Sirwal
      brand_id: 1,
      base_price: 125000,
      gender_id: 1
    }
  ];

  for (const ps of productSamples) {
    const product = await prisma.product.upsert({
      where: { id: productSamples.indexOf(ps) + 1 },
      update: ps,
      create: ps,
    });

    // Seed Variants for each product
    await prisma.productVariant.upsert({
      where: {
        product_id_color_id_size_id: {
          product_id: product.id,
          color_id: 1, // Hitam
          size_id: 2,  // M
        }
      },
      update: {},
      create: {
        product_id: product.id,
        color_id: 1,
        size_id: 2,
        sku: `SKU-${product.id}-BK-M`,
        stock: 100,
        price: ps.base_price,
      }
    });

    await prisma.productVariant.upsert({
      where: {
        product_id_color_id_size_id: {
          product_id: product.id,
          color_id: 2, // Putih
          size_id: 3,  // L
        }
      },
      update: {},
      create: {
        product_id: product.id,
        color_id: 2,
        size_id: 3,
        sku: `SKU-${product.id}-WT-L`,
        stock: 50,
        price: ps.base_price,
      }
    });

    // Seed primary image
    await prisma.productImage.create({
      data: {
        product_id: product.id,
        image_url: `/catalog/products/${product.id}_primary.jpg`,
        is_primary: 1
      }
    });
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
