## Portfolio Template (Next.js)

A customizable portfolio template. All content comes from a single JSON file.

### Quick start

```bash
git clone <this-repo-url> my-portfolio
cd my-portfolio
npm i
npm run dev
```

Open `http://localhost:3000`.

### Configure content

- Edit `data/portfolio-data.json` (name, title, experience, education, projects).
- Replace images in `public/` and update paths in the JSON.
- Create a `.env.local` file and add a valid `OPENAI_API_KEY`.
- Optional: tweak styles in `tailwind.config.ts` and `app/globals.css`.

### Deploy

- Deploy to Vercel: push to GitHub and import the repo at `https://vercel.com`.


### Attribution

Built on top of the “Portfolio Website” template by hilmishah on v0: `https://v0.app/templates/portfolio-website-oIAnwmv30iR`.

### Author

Waseeq Ur Rehman — [waseeq.dev](https://waseeq.dev)

### License

MIT — free to use and modify.


