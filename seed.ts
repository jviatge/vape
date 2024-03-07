import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    const password = "password";

    const users = [
        {
            last_name: "Doe",
            first_name: "John",
            password,
            email: "john.doe@example.com",
            role: "admin",
        },
        {
            last_name: "Smith",
            first_name: "Jane",
            password,
            email: "jane.smith@example.com",
            role: "bateau",
        },
        {
            last_name: "Viatgé",
            first_name: "Julien",
            password,
            email: "julien.viatge@gmail.com",
            role: "super_admin",
        },
        // Add more user data here
    ];

    const reservations = [
        {
            adults: 2,
            teenagers: 1,
            children: 0,
            free: 1,
            date: new Date(),
            departure_time: new Date(),
            arrival_time: new Date(),
            observations: "Some observations",
            affiliation: "Some affiliation",
            route: "12km",
            paid: true,
            client_id: 1,
        },
        {
            adults: 1,
            teenagers: 0,
            children: 2,
            free: 0,
            date: new Date(),
            departure_time: new Date(),
            arrival_time: new Date(),
            observations: "Some observations",
            affiliation: "Some affiliation",
            route: "8km",
            paid: false,
            client_id: 2,
        },
        // Add more reservation data here
    ];

    const rentals = [
        {
            c2: 1,
            c3: 0,
            k1: 1,
            arrival_time: new Date(),
            dog: false,
            comfort: true,
        },
        {
            c2: 0,
            c3: 1,
            k1: 0,
            arrival_time: new Date(),
            dog: true,
            comfort: false,
        },
        // Add more rental data here
    ];

    const clients = [
        {
            last_name: "Johnson",
            first_name: "Michael",
            email: "michael.johnson@example.com",
            phone: "1234567890",
            city: "New York",
            country: "USA",
            vacation_zip_code: "12345",
            vacation_city: "Miami",
        },
        {
            last_name: "Williams",
            first_name: "Emily",
            email: "emily.williams@example.com",
            phone: "9876543210",
            city: "Los Angeles",
            country: "USA",
            vacation_zip_code: "54321",
            vacation_city: "Orlando",
        },
        // Add more client data here
    ];

    for (const user of users) {
        await db.users.create({ data: user });
    }

    for (const rental of rentals) {
        await db.rentals.create({ data: rental });
    }

    for (const client of clients) {
        await db.clients.create({ data: client });
    }

    for (const reservation of reservations) {
        await db.reservations.create({ data: reservation });
    }
}

main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });
