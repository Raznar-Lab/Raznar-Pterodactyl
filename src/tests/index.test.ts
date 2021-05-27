import Pterodactyl from "..";

const clientKey = "wL1RwAo9Kj8dMucMbKX8kcFo4daCsnfggQLhJjU8bEf98BK9";
const pteroClient = new Pterodactyl("https://admin.hosting.raznar.id", clientKey);

test("GetAllServers", (done) => {
    pteroClient.client.server.getAll().then((servers) => {
        if (servers.length > 0) {
            done();
        }
    }).catch((e) => {
        done(e);
    });
});

test("GetAccountDetails", (done) => {
    pteroClient.client.account.getDetails().then((account) => {
        expect(account).toBeDefined();
        done();
    }).catch((e) => {
        done(e);
    });
});

test("ShowPermissions", (done) => {
    pteroClient.client.showPermissions().then((permissions) => {
        expect(permissions).toBeDefined();
        done();
    }).catch((e) => {
        done(e);
    });
});

test("GetServerDetails", (done) => {
    pteroClient.client.server.getDetails("d52ae19b").then((server) => {
        expect(server).toBeDefined();
        done();
    }).catch((e) => {
        done(e);
    });
});


test("GetSchedules", (done) => {
    pteroClient.client.server.schedule.getAll("d52ae19b").then(schedules => {
        expect(schedules).toBeDefined();
        done();
    }).catch((e) => done(e));
});

test("CreateFolder", (done) => {
    pteroClient.client.server.files.createFolder("d52ae19b", {
        root: "/",
        name: "test"
    }).then((success) => {
        expect(success).toBeTruthy();
        done();
    }).catch((e) => done(e));
});

test("WriteFile", (done) => {
    pteroClient.client.server.files.write("d52ae19b", "/home/container/index.ts", "anjayy").then((success) => {
        expect(success).toBeTruthy();
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
test("GetEggsDetails", (done) => {
    pteroAdmin.admin.nests.eggs.getDetails(1, 1).then((success) => {
        expect(success).toBeTruthy();
        done();
    }).catch((e) => done(e));
});

test("GetUsers", (done) => {
    pteroAdmin.admin.users.getAll().then((success) => {
        expect(success).toBeTruthy();
        done();
    }).catch((e) => done(e));
})