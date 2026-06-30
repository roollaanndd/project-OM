/**
 * Seed database with initial data.
 * Run: bun run db:seed
 */
import { db } from "@/lib/db";

async function main() {
  console.log("🌱 Seeding database...");

  // Seed CMS users
  const cmsUsers = [
    { email: "admin@omdc.id", name: "Oktri Manessa", role: "admin", initials: "OM", gradient: "from-pink-500 to-fuchsia-600" },
    { email: "dokter@omdc.id", name: "Bayu Pratama", role: "doctor", initials: "BP", gradient: "from-rose-500 to-pink-600" },
    { email: "resepsionis@omdc.id", name: "Siti Aminah", role: "receptionist", initials: "SA", gradient: "from-amber-400 to-pink-500" },
    { email: "finance@omdc.id", name: "Andi Wijaya", role: "finance", initials: "AW", gradient: "from-emerald-500 to-teal-600" },
  ];

  for (const u of cmsUsers) {
    await db.cmsUser.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
  }
  console.log(`✓ ${cmsUsers.length} CMS users seeded`);

  // Seed branches
  const branches = [
    { name: "OMDC Bekasi Selatan", area: "Bekasi Selatan", address: "Jl. Melati Raya No. 17, Bekasi Selatan, Jawa Barat 17141", phone: "+62 812-3456-7890", openHours: "Senin – Sabtu: 09.00 – 21.00 · Minggu: 10.00 – 16.00", isPrimary: true },
    { name: "OMDC Jakarta Selatan", area: "Jakarta Selatan", address: "Jl. Kemang Raya No. 88, Jakarta Selatan, DKI Jakarta 12730", phone: "+62 812-3456-7891", openHours: "Senin – Sabtu: 09.00 – 21.00 · Minggu: 10.00 – 16.00" },
    { name: "OMDC Tangerang", area: "Tangerang", address: "Jl. Boulevard Raya No. 24, Tangerang, Banten 15158", phone: "+62 812-3456-7892", openHours: "Senin – Sabtu: 09.00 – 20.00 · Minggu: Tutup" },
  ];

  for (const b of branches) {
    await db.branch.upsert({
      where: { id: b.name }, // use name as pseudo-unique
      update: {},
      create: b,
    }).catch(() => {}); // ignore if exists
  }
  console.log(`✓ ${branches.length} branches seeded`);

  // Seed doctors
  const doctors = [
    { name: "drg. Oktri Manessa, Sp.Ort", specialty: "Orthodontist", initials: "OM", gradient: "from-pink-500 to-fuchsia-600", rating: 4.9, photo: "/doctors/doctor-1.jpg", avail: "Sen, Rab, Jum" },
    { name: "drg. Adelia Putri, Sp.KGA", specialty: "Gigi Anak", initials: "AP", gradient: "from-rose-500 to-amber-400", rating: 4.9, photo: "/doctors/doctor-2.jpg", avail: "Sel, Kam, Sab" },
    { name: "drg. Reza Mahendra, Sp.Perio", specialty: "Gusi & Implant", initials: "RM", gradient: "from-fuchsia-500 to-rose-700", rating: 4.8, photo: "/doctors/doctor-3.jpg", avail: "Sen, Sel, Kam" },
    { name: "drg. Salsabila Karim, Sp.Pros", specialty: "Gigi Palsu & Estetik", initials: "SK", gradient: "from-pink-600 to-fuchsia-700", rating: 5.0, photo: "/doctors/doctor-4.jpg", avail: "Rab, Jum, Sab" },
  ];

  for (const d of doctors) {
    const existing = await db.doctor.findFirst({ where: { name: d.name } });
    if (!existing) {
      await db.doctor.create({ data: d });
    }
  }
  console.log(`✓ ${doctors.length} doctors seeded`);

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
