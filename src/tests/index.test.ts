import Pterodactyl from "..";

const apikey = "wL1RwAo9Kj8dMucMbKX8kcFo4daCsnfggQLhJjU8bEf98BK9";
const ptero = new Pterodactyl("https://admin.hosting.raznar.id", apikey);
test("GetAllServers", (done) => {
    ptero.client.getAllServers().then((servers) => {
        if (servers.length > 0) {
            done();
        }
    }).catch((e) => {
        done(e);
    });
});

test("GetAccountDetails", (done) => {
    ptero.client.account.getDetails().then((account) => {
        expect(account).toBeDefined();
        done();
    }).catch((e) => {
        done(e);
    });
});

test("ShowPermissions", (done) => {
    ptero.client.showPermissions().then((permissions) => {
        expect(permissions).toBeDefined();
        done();
    }).catch((e) => {
        done(e);
    });
});

test("GetServerDetails", (done) => {
    ptero.client.server("d52ae19b").getDetails().then((server) => {
        expect(server).toBeDefined();
        done();
    }).catch((e) => {
        done(e);
    });
});


test("GetSchedules", (done) => {
    ptero.client.server("d52ae19b").schedule.getAll().then(schedules => {
        expect(schedules).toBeDefined();
        done();
    }).catch((e) => done(e));
});