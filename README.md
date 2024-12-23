<p align="center">
    <img src="/public/app/logo.svg" width="500"/><br/>
</p>

Vape is the simplest and fastest way to build production-ready administration panels using nextjs

## Install

### Auto

```BASH
wget -O - https://raw.githubusercontent.com/jviatge/vape/refs/heads/V-1.1.0/install.sh | bash
```

or

```BASH
curl -s https://raw.githubusercontent.com/jviatge/vape/refs/heads/V-1.1.0/install.sh >tmp.sh
bash tmp.sh
```

### Manually

1 - clone vape

```BASH
git clone https://github.com/jviatge/vape.git .vape && cd .vape

```

2 - Run init

```BASH
pnpm init-project

```

3 - Install

```BASH
pnpm install

```

4 - Generate database

```BASH
pnpm generate
```

5 - Migrate database

```BASH
pnpm migrate
```

6 - Seed database

```BASH
pnpm seed
```

---

## Usage

### Development

```BASH
pnpm dev
```

### Production

## Configs

```JAVASCRIPT
import { Magix } from 'm4gixjs'
```

---

## Resources

### Params

---

#### Read / Update / Create

---

### Models

---

@TODO

-   Typage ressource
-   Docs...
-   Link github on login
-   Version Vape on config
