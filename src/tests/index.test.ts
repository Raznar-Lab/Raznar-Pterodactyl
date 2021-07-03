import Pterodactyl from "..";

const clientKey = "wL1RwAo9Kj8dMucMbKX8kcFo4daCsnfggQLhJjU8bEf98BK9";
const pteroClient = new Pterodactyl("https://admin.hosting.raznar.id", clientKey);
// Client
// Account

// 2FA
test("2FA", (done) => {
    pteroClient.client.account.twoFactor().then((successs) => {
        expect(successs).toBeTruthy();
        done();
    }).catch((e) => done(e));
});


// Admin Section
const adminKey = "A53B6B7NPe0kBq8oloTRbLsPds5krG0kS2G6PzF8WiDGf837";
const pteroAdmin = new Pterodactyl("https://admin.hosting.raznar.id", adminKey);
test("GetEggs", (done) => {
    pteroAdmin.admin.nests.eggs.getAll(1).then((success) => {
        expect(success).toBeTruthy();
        done();
    }).catch((e) => done(e));
});