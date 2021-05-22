import Pterodactyl from "..";

test("GetAllServers", (done) => {
    const apikey = "3sAIRYeiZfB7BVmlweNd7WCB8hcUzwGKs5MjyopdlxyrWjqh";
    const ptero = new Pterodactyl("https://admin.hosting.raznar.id", apikey);
    ptero.client.getAllServers().then((servers) => {
        expect(servers).toHaveReturned();
        done();
    }).catch((e) => {
        done(e);
    });
});