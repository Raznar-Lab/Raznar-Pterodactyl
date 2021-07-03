# 🔧 Ractyl (Raznar Pterodactyl)

Ractyl (Raznar Pterodactyl) is an API Wrapper for Pterodactyl Panels (pterodactyl.io). This API Wrapper designed to help us on some of our projects that require integration with the Pterodactyl API. 
> Note, this library is still in BETA. So some functions may not be as functional as they are.

# 💉 Installation
You can using YARN or NPM.

With NPM
> npm install ractyl

or (install from source)
> npm install https://github.com/Raznar-Lab/Raznar-Pterodactyl

With YARN
> yarn add ractyl

or (install from source)
> yarn add https://github.com/Raznar-Lab/Raznar-Pterodactyl

# 📜 How to use?
It's easy to use. First, import this library into your code.

## 🤔 How to import it?
If you're using TypeScript
```ts
import Ractyl from "ractyl";

const ptero = new Ractyl("here, put your pterodactyl panel baseurl", "here, put your apikey");

// if you're an admin
ptero.admin.servers.getAll().then(console.log).catch(console.error);

// if you're client
ptero.client.servers.getAll().then(console.log).catch(console.error);
```

If you're using JavaScript
```js
const Ractyl = require("ractyl").default;

const ptero = new Ractyl("here, put your pterodactyl panel baseurl", "here, put your apikey");

// if you're an admin
ptero.admin.servers.getAll().then(console.log).catch(console.error);

// if you're client
ptero.client.servers.getAll().then(console.log).catch(console.error);
```

👏 Congratulations, you already know how to use it.
Next.

## 🤨 What are the functions inside?
Inside, you can find the function of getting logs in realtime (can only be found in the client), and managing files and folders is very easy.

Explore other functions in the documentation 😊

# 🐞 Bugs
You can create an issue in the [repository](https://github.com/Raznar-Lab/Raznar-Pterodactyl/issues)

# License
MIT &copy; [Raznar](https://github.com/Raznar-Lab)